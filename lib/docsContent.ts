export type CodeSnippet = {
  language: 'kotlin' | 'typescript' | 'bash' | 'json' | 'yaml'
  filename: string
  code: string
}

export type DocSubsection = {
  id: string
  title: string
  content: string[]
  codeSnippets?: CodeSnippet[]
}

export type DocSection = {
  id: string
  navTitle: string
  title: string
  subtitle: string
  content: string[]
  codeSnippets?: CodeSnippet[]
  subsections?: DocSubsection[]
}

export const DOC_SECTIONS: DocSection[] = [
  {
    id: 'introduction',
    navTitle: 'Introduction & Setup',
    title: 'Introduction & Environment Setup',
    subtitle: 'Bootstrapping Vectra XR for Meta Quest 3 development',
    content: [
      'Vectra XR is a native Horizon OS application built on the Meta Spatial SDK — Meta\'s first-party framework for building fully immersive and mixed-reality experiences on the Quest platform without routing through a traditional game engine. Unlike Unity or Unreal integrations, Vectra XR compiles directly against the Android runtime and surfaces its UI through Jetpack Compose XR panels rendered by the Compositor layer.',
      'This architecture choice is deliberate. Removing the game-engine intermediary reduces binary size by ~40%, eliminates frame-pacing overhead introduced by engine abstraction layers, and gives Vectra XR direct access to the full Android API surface — including CameraX, Bluetooth LE, and WorkManager — with zero bridging cost.',
      'The stack is: Kotlin 1.9 + Coroutines + Flow, Meta Spatial SDK 0.5+, Jetpack Compose XR, CameraX, ML Kit Barcode Scanning, and a WebSocket channel to the Astra Matrix backend for Metastrate Ledger synchronization.',
    ],
    codeSnippets: [
      {
        language: 'bash',
        filename: 'terminal',
        code: `# Clone the Vectra XR development template
git clone https://github.com/Astra-Matrix/vectra-xr-template.git
cd vectra-xr-template

# Sync Gradle dependencies (requires JDK 17+)
./gradlew dependencies --configuration releaseRuntimeClasspath`,
      },
      {
        language: 'kotlin',
        filename: 'build.gradle.kts (app)',
        code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    compileSdk = 36
    defaultConfig {
        applicationId = "com.astramatrix.vectraxr"
        minSdk = 32 // Quest 3 minimum
        targetSdk = 36
        versionCode = 24
        versionName = "2.4.1"
    }
    buildFeatures { compose = true }
    composeOptions { kotlinCompilerExtensionVersion = "1.5.14" }
}

dependencies {
    // Meta Spatial SDK — core runtime + scene graph
    implementation("com.meta.spatial:meta-spatial-sdk:0.5.2")
    implementation("com.meta.spatial:meta-spatial-sdk-compose:0.5.2")
    implementation("com.meta.spatial:meta-spatial-sdk-physics:0.5.2")

    // Jetpack Compose XR
    implementation(platform("androidx.compose:compose-bom:2024.09.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.xr.compose:compose:1.0.0-alpha01")

    // Vision pipeline
    implementation("androidx.camera:camera-camera2:1.3.4")
    implementation("androidx.camera:camera-lifecycle:1.3.4")
    implementation("com.google.mlkit:barcode-scanning:17.3.0")

    // Async / networking
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
    implementation("io.ktor:ktor-client-okhttp:2.3.12")
    implementation("io.ktor:ktor-client-websockets:2.3.12")
}`,
      },
    ],
    subsections: [
      {
        id: 'introduction-prereqs',
        title: 'Prerequisites',
        content: [
          'Android Studio Ladybug (2024.2) or later with the Android XR SDK plugin installed.',
          'Meta Quest Developer Hub 5.x connected to a Quest 3 device over USB-C or Wi-Fi ADB.',
          'A Meta Developer account with the application registered in the Meta Quest Developer Dashboard to receive a valid App ID for the Spatial SDK runtime.',
          'JDK 17 is required. The build will fail on JDK 21 due to an incompatibility in the Meta Spatial SDK\'s native code generator.',
        ],
        codeSnippets: [
          {
            language: 'bash',
            filename: 'terminal',
            code: `# Verify toolchain
java -version   # Must be 17.x
adb devices     # Quest 3 must appear as 'device', not 'unauthorized'

# Enable developer mode on device via Meta Quest mobile app:
# Settings → Developer → USB Connection Dialog → Always allow`,
          },
        ],
      },
    ],
  },
  {
    id: 'architecture',
    navTitle: 'Core Architecture',
    title: 'Core Architecture: ECS & Compose XR',
    subtitle: 'How the Entity-Component-System scene graph powers the Vectra XR spatial canvas',
    content: [
      'The Meta Spatial SDK is built around a strict Entity-Component-System (ECS) architecture. Every object in the 3D scene — a spatial panel, a 3D asset, a physics collider, or a spatial anchor — is an Entity. Behavior and data are attached to entities via Components. Systems run each frame and query entities that hold specific component combinations to execute logic.',
      'This pattern is fundamentally different from traditional object-oriented scene graphs (Unity GameObjects, Unreal Actors). It enables aggressive cache-friendly iteration over component arrays and makes it trivial to attach, detach, and hot-swap behaviors at runtime — which Vectra XR exploits heavily when transitioning between "scan mode" and "diagnostics mode" without destroying and rebuilding scene objects.',
      'Jetpack Compose XR panels are attached to entities via the Panel component. Each panel hosts a standard Composable tree — the same code you\'d write for a phone UI. The Compositor automatically reprojects the panel texture into the 3D scene at the correct depth and scale, handling all distortion correction for the Quest 3 optics.',
    ],
    codeSnippets: [
      {
        language: 'kotlin',
        filename: 'VectraXrActivity.kt',
        code: `class VectraXrActivity : ImmersiveActivity() {

    private val system by lazy { systemManager }

    override fun registerSystems() {
        // Register Vectra custom systems before the SDK's built-in pass
        system.registerSystem(DiagnosticsStreamSystem())
        system.registerSystem(SpatialAnchorBindingSystem())
        system.registerSystem(LedgerSyncSystem())
    }

    override fun registerComponents() {
        ComponentManager.registerComponent<DiagnosticsState>()
        ComponentManager.registerComponent<AssetBindingTag>()
        ComponentManager.registerComponent<ScannerActiveTag>()
    }

    override fun onSceneReady() {
        // Bootstrap the main diagnostics panel entity
        Entity.create(
            Panel(R.xml.diagnostics_panel_config),
            Transform(Pose(Vector3(0f, 1.6f, -0.8f))),
            DiagnosticsState(connected = false),
        )
    }
}`,
      },
    ],
    subsections: [
      {
        id: 'architecture-ecs',
        title: 'Defining Custom Components',
        content: [
          'Components in the Meta Spatial SDK are plain Kotlin data classes annotated with @Component. They must be registered before onSceneReady() fires or the system will throw a ComponentNotRegisteredException.',
          'Components should be pure data containers — no logic, no coroutines. All mutation happens inside System classes via the EntityQuery DSL.',
        ],
        codeSnippets: [
          {
            language: 'kotlin',
            filename: 'DiagnosticsState.kt',
            code: `@Component
data class DiagnosticsState(
    val connected: Boolean = false,
    val batteryVoltage: Float = 0f,     // Volts
    val cellTemperature: Float = 0f,    // Celsius
    val lastScanTimestamp: Long = 0L,
    val assetId: String? = null,
)

@Component
data class AssetBindingTag(
    val metastrateHash: String = "",
    val anchorPersistenceId: String = "",
)

// Marker component — zero-size, used purely for system queries
@Component
class ScannerActiveTag`,
          },
        ],
      },
      {
        id: 'architecture-systems',
        title: 'Writing a Custom System',
        content: [
          'Systems are classes that extend System and implement execute(). The SDK calls execute() once per frame on the render thread. Avoid blocking I/O here — use SharedFlow collectors on a background dispatcher and write the result back to components atomically.',
          'The EntityQuery builder lets you filter entities by component presence or absence. The has() predicate is the primary filter; without() excludes entities holding a given component type.',
        ],
        codeSnippets: [
          {
            language: 'kotlin',
            filename: 'DiagnosticsStreamSystem.kt',
            code: `class DiagnosticsStreamSystem : System() {

    private val query = EntityQuery.Builder()
        .has(DiagnosticsState::class)
        .has(AssetBindingTag::class)
        .without(ScannerActiveTag::class)
        .build()

    // Pending updates from BLE coroutine — lock-free ringbuffer
    private val pendingUpdates = ArrayDeque<Pair<Long, DiagnosticsState>>()

    override fun execute() {
        // Drain pending BLE state updates into the ECS
        val now = System.nanoTime()
        while (pendingUpdates.isNotEmpty()) {
            val (entityId, state) = pendingUpdates.removeFirst()
            val entity = Entity(entityId) ?: continue
            entity.setComponent(state.copy(lastScanTimestamp = now))
        }

        // Drive UI panel visibility based on diagnostics connection state
        query.forEach { entity ->
            val state = entity.getComponent<DiagnosticsState>()
            val panel = entity.getComponent<Panel>() ?: return@forEach
            panel.isVisible = state.connected
            entity.setComponent(panel)
        }
    }

    fun enqueueUpdate(entityId: Long, state: DiagnosticsState) {
        pendingUpdates.addLast(entityId to state)
    }
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'vision-pipeline',
    navTitle: 'Vision Pipeline',
    title: 'Vision Pipeline: CameraX & ML Kit',
    subtitle: 'Passthrough camera access, barcode analysis, and real-time QR parsing',
    content: [
      'Vectra XR\'s primary input modality for asset identification is passive barcode and QR scanning via the Quest 3 passthrough cameras. The device exposes both left and right monochrome cameras to the Android CameraX API under the CAMERA permission group — no special Meta SDK permissions are required for basic capture; however high-framerate access above 30fps requires the com.oculus.permission.USE_SCENE permission declared in the manifest.',
      'The vision pipeline is a three-stage process: (1) CameraX ImageAnalysis fires a Analyzer callback on a dedicated background Executor with each new frame; (2) the frame is passed as an InputImage to ML Kit\'s BarcodeScanning client; (3) on successful decode, the result is emitted on a SharedFlow that the DiagnosticsStreamSystem collects on the main thread.',
      'Critically, the ML Kit scanner runs on-device with the bundled model — no network call is made during barcode processing. Latency from frame capture to Kotlin callback is consistently under 80ms on the XR2 Gen 3 SOC.',
    ],
    codeSnippets: [
      {
        language: 'kotlin',
        filename: 'VisionPipelineManager.kt',
        code: `class VisionPipelineManager(
    private val context: Context,
    private val lifecycleOwner: LifecycleOwner,
) {
    private val _scanResults = MutableSharedFlow<BarcodeResult>(
        extraBufferCapacity = 8,
        onBufferOverflow = BufferOverflow.DROP_OLDEST,
    )
    val scanResults: SharedFlow<BarcodeResult> = _scanResults.asSharedFlow()

    private val barcodeOptions = BarcodeScannerOptions.Builder()
        .setBarcodeFormats(
            Barcode.FORMAT_QR_CODE,
            Barcode.FORMAT_DATA_MATRIX,
            Barcode.FORMAT_CODE_128,
        )
        .build()

    private val scanner = BarcodeScanning.getClient(barcodeOptions)
    private val analysisExecutor = Executors.newSingleThreadExecutor()

    fun bindCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
        cameraProviderFuture.addListener({
            val provider = cameraProviderFuture.get()

            val imageAnalysis = ImageAnalysis.Builder()
                .setTargetResolution(Size(1280, 720))
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .setOutputImageFormat(ImageAnalysis.OUTPUT_IMAGE_FORMAT_YUV_420_888)
                .build()
                .also { analysis ->
                    analysis.setAnalyzer(analysisExecutor) { imageProxy ->
                        processFrame(imageProxy)
                    }
                }

            provider.bindToLifecycle(
                lifecycleOwner,
                CameraSelector.DEFAULT_BACK_CAMERA,
                imageAnalysis,
            )
        }, ContextCompat.getMainExecutor(context))
    }

    private fun processFrame(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image ?: run {
            imageProxy.close()
            return
        }
        val inputImage = InputImage.fromMediaImage(
            mediaImage,
            imageProxy.imageInfo.rotationDegrees,
        )

        scanner.process(inputImage)
            .addOnSuccessListener { barcodes ->
                barcodes.firstOrNull()?.rawValue?.let { raw ->
                    _scanResults.tryEmit(BarcodeResult(raw = raw, format = barcodes[0].format))
                }
            }
            .addOnCompleteListener { imageProxy.close() }
    }
}

data class BarcodeResult(val raw: String, val format: Int)`,
      },
    ],
    subsections: [
      {
        id: 'vision-manifest',
        title: 'Manifest & Permissions',
        content: [
          'The Quest 3 passthrough cameras require explicit manifest declarations. The com.oculus.permission.USE_SCENE permission gates access to the scene understanding mesh; without it, CameraX will still bind but ImageAnalysis frames will be blank on Quest 3 firmware 65+.',
        ],
        codeSnippets: [
          {
            language: 'yaml',
            filename: 'AndroidManifest.xml',
            code: `<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="com.oculus.permission.USE_SCENE" />
    <uses-permission android:name="com.oculus.permission.EYE_TRACKING" />
    <uses-permission android:name="com.oculus.permission.HAND_TRACKING" />

    <!-- Declare Quest 3 as the minimum target device -->
    <uses-feature
        android:name="android.hardware.vr.headtracking"
        android:required="true"
        android:version="1" />

    <application
        android:label="Vectra XR"
        android:icon="@mipmap/ic_launcher">

        <activity
            android:name=".VectraXrActivity"
            android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen"
            android:screenOrientation="landscape"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <category android:name="com.oculus.intent.category.VR" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
          },
        ],
      },
    ],
  },
  {
    id: 'diagnostics',
    navTitle: 'Diagnostics & Hardware Tracking',
    title: 'Diagnostics & Hardware Tracking',
    subtitle: 'BLE peripheral scanning, live sensor telemetry, and real-time state streams',
    content: [
      'Once a hardware asset is identified via the vision pipeline, Vectra XR attempts to establish a Bluetooth Low Energy (BLE) connection to the asset\'s embedded telemetry module — a Nordic nRF52840-based board running the Vectra Telemetry Firmware (VTF). The telemetry board broadcasts voltage, cell temperature, maintenance flags, and firmware version over three custom GATT characteristics under the Astra Matrix service UUID (0x4153).',
      'The Android BLE stack is notoriously fragile; Vectra XR uses a state-machine-driven connection manager with exponential backoff, connection priority escalation (BluetoothGatt.CONNECTION_PRIORITY_HIGH), and MTU negotiation to 512 bytes. All GATT operations are serialized through a dedicated single-thread coroutine dispatcher to avoid the BluetoothGattCallback threading pitfalls that cause silent characteristic read failures.',
      'Diagnostics data is modelled as a Kotlin Flow pipeline: the BLE GATT callback emits raw ByteArray payloads, a parser stage decodes the binary VTF protocol into typed DiagnosticsPayload objects, and a conflation stage collapses bursts into a single emission to prevent the Compose UI from re-composing at the raw 20Hz BLE notification rate.',
    ],
    codeSnippets: [
      {
        language: 'kotlin',
        filename: 'BleConnectionManager.kt',
        code: `class BleConnectionManager(private val context: Context) {

    companion object {
        val ASTRA_SERVICE_UUID: UUID = UUID.fromString("0000ffff-0000-1000-8000-00805f9b34fb")
        val VOLTAGE_CHAR_UUID: UUID  = UUID.fromString("00004153-0000-1000-8000-00805f9b34fb")
        val TEMP_CHAR_UUID: UUID     = UUID.fromString("00004154-0000-1000-8000-00805f9b34fb")
        val FLAGS_CHAR_UUID: UUID    = UUID.fromString("00004155-0000-1000-8000-00805f9b34fb")
        val CCCD_UUID: UUID          = UUID.fromString("00002902-0000-1000-8000-00805f9b34fb")
    }

    private val _telemetry = MutableStateFlow<DiagnosticsPayload?>(null)
    val telemetry: StateFlow<DiagnosticsPayload?> = _telemetry.asStateFlow()

    private val bleDispatcher = Executors.newSingleThreadExecutor().asCoroutineDispatcher()
    private var gatt: BluetoothGatt? = null

    suspend fun connect(device: BluetoothDevice) = withContext(bleDispatcher) {
        gatt = device.connectGatt(context, false, object : BluetoothGattCallback() {

            override fun onConnectionStateChange(g: BluetoothGatt, status: Int, newState: Int) {
                if (newState == BluetoothProfile.STATE_CONNECTED) {
                    g.requestConnectionPriority(BluetoothGatt.CONNECTION_PRIORITY_HIGH)
                    g.requestMtu(512)
                }
            }

            override fun onMtuChanged(g: BluetoothGatt, mtu: Int, status: Int) {
                if (status == BluetoothGatt.GATT_SUCCESS) g.discoverServices()
            }

            override fun onServicesDiscovered(g: BluetoothGatt, status: Int) {
                val service = g.getService(ASTRA_SERVICE_UUID) ?: return
                subscribeToCharacteristic(g, service.getCharacteristic(VOLTAGE_CHAR_UUID))
                subscribeToCharacteristic(g, service.getCharacteristic(TEMP_CHAR_UUID))
                subscribeToCharacteristic(g, service.getCharacteristic(FLAGS_CHAR_UUID))
            }

            override fun onCharacteristicChanged(
                g: BluetoothGatt,
                characteristic: BluetoothGattCharacteristic,
                value: ByteArray,
            ) {
                val current = _telemetry.value ?: DiagnosticsPayload()
                _telemetry.value = when (characteristic.uuid) {
                    VOLTAGE_CHAR_UUID -> current.copy(
                        voltage = ByteBuffer.wrap(value).float
                    )
                    TEMP_CHAR_UUID -> current.copy(
                        temperatureCelsius = ByteBuffer.wrap(value).float
                    )
                    FLAGS_CHAR_UUID -> current.copy(
                        maintenanceRequired = value[0] != 0.toByte()
                    )
                    else -> current
                }
            }
        }, BluetoothDevice.TRANSPORT_LE)
    }

    private fun subscribeToCharacteristic(
        gatt: BluetoothGatt,
        char: BluetoothGattCharacteristic?,
    ) {
        char ?: return
        gatt.setCharacteristicNotification(char, true)
        val cccd = char.getDescriptor(CCCD_UUID)
        gatt.writeDescriptor(cccd, BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE)
    }

    fun disconnect() { gatt?.disconnect(); gatt?.close(); gatt = null }
}

data class DiagnosticsPayload(
    val voltage: Float = 0f,
    val temperatureCelsius: Float = 0f,
    val maintenanceRequired: Boolean = false,
)`,
      },
    ],
    subsections: [
      {
        id: 'diagnostics-compose',
        title: 'Composable Diagnostics Panel',
        content: [
          'The diagnostics data is consumed by a Jetpack Compose XR panel attached to a spatial anchor above the scanned physical hardware. The panel auto-sizes to 600×400dp and updates at a conflated rate so a BLE burst of 20 notifications in 50ms results in a single Composition, not 20.',
        ],
        codeSnippets: [
          {
            language: 'kotlin',
            filename: 'DiagnosticsPanel.kt',
            code: `@Composable
fun DiagnosticsPanel(viewModel: DiagnosticsViewModel = viewModel()) {
    val payload by viewModel.telemetry.collectAsStateWithLifecycle()

    VectraTheme {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFF121214))
                .padding(24.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            TelemetryRow(
                label   = "VOLTAGE",
                value   = "\${"%.2f".format(payload?.voltage ?: 0f)} V",
                nominal = (payload?.voltage ?: 0f) in 3.2f..4.2f,
            )
            TelemetryRow(
                label   = "TEMPERATURE",
                value   = "\${"%.1f".format(payload?.temperatureCelsius ?: 0f)} °C",
                nominal = (payload?.temperatureCelsius ?: 0f) < 45f,
            )
            MaintenanceFlag(active = payload?.maintenanceRequired == true)
        }
    }
}

@Composable
private fun TelemetryRow(label: String, value: String, nominal: Boolean) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Text(label, color = Color(0xFF00F0FF).copy(alpha = 0.5f), fontFamily = FontFamily.Monospace)
        Text(
            value,
            color = if (nominal) Color(0xFF00F0FF) else Color(0xFFFF9900),
            fontFamily = FontFamily.Monospace,
            fontWeight = FontWeight.Bold,
        )
    }
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'metastrate',
    navTitle: 'Infrastructure Sync',
    title: 'Infrastructure Sync: Metastrate Substrate',
    subtitle: 'Connecting Vectra XR to the immutable decentralized asset ledger',
    content: [
      'Metastrate is the distributed asset ledger that backs all Vectra XR physical-digital bindings. Every scan event, diagnostics snapshot, maintenance flag change, and location update is written as an immutable transaction to a permissioned ledger maintained across Astra Matrix\'s infrastructure nodes. The ledger is content-addressed: each asset state hash is derived from the previous state hash (Merkle-chain), making the audit trail cryptographically tamper-evident.',
      'Vectra XR communicates with the Metastrate Substrate via a persistent WebSocket connection authenticated with a per-device Ed25519 key pair generated at first launch and bound to the device\'s Android Keystore. The private key never leaves the secure enclave. Each outbound message is signed; the Substrate validates the signature and rejects malformed or replayed messages using a monotonic sequence counter.',
      'The Ktor WebSocket client on the device maintains the connection with a heartbeat interval of 30 seconds. On reconnect (network switch, sleep-wake cycle), a differential sync protocol catches the device up: the Substrate sends only the delta between the device\'s last acknowledged sequence and the current ledger head, minimizing bandwidth on the Quest\'s Wi-Fi 6E radio.',
    ],
    codeSnippets: [
      {
        language: 'kotlin',
        filename: 'MetastrateClient.kt',
        code: `class MetastrateClient(
    private val deviceId: String,
    private val keyStore: VectraKeyStore,
) {
    companion object {
        private const val WS_ENDPOINT = "wss://substrate.astramatrix.io/v1/sync"
        private const val HEARTBEAT_INTERVAL_MS = 30_000L
    }

    private val httpClient = HttpClient(OkHttp) {
        install(WebSockets) {
            pingInterval = HEARTBEAT_INTERVAL_MS
        }
        install(ContentNegotiation) { json() }
    }

    private val _ledgerEvents = MutableSharedFlow<LedgerEvent>(replay = 0)
    val ledgerEvents: SharedFlow<LedgerEvent> = _ledgerEvents.asSharedFlow()

    private var sequenceCounter = AtomicLong(0L)

    suspend fun connect() {
        val lastAck = getLastAcknowledgedSequence()

        httpClient.webSocket(
            method  = HttpMethod.Get,
            host    = "substrate.astramatrix.io",
            path    = "/v1/sync?deviceId=$deviceId&since=$lastAck",
            request = { header("X-Device-Id", deviceId) },
        ) {
            // Receive delta events from ledger head
            launch {
                for (frame in incoming) {
                    if (frame is Frame.Text) {
                        val event = Json.decodeFromString<LedgerEvent>(frame.readText())
                        _ledgerEvents.emit(event)
                        persistLastAck(event.sequence)
                    }
                }
            }
        }
    }

    suspend fun publishAssetEvent(event: AssetEvent) {
        val seq = sequenceCounter.incrementAndGet()
        val payload = AssetEventPayload(
            deviceId  = deviceId,
            sequence  = seq,
            timestamp = System.currentTimeMillis(),
            event     = event,
        )
        val signature = keyStore.sign(Json.encodeToString(payload).toByteArray())
        val signed = SignedPayload(payload = payload, signature = signature.encodeBase64())
        // enqueue for WebSocket send on the active session
        outboundQueue.send(signed)
    }

    private fun getLastAcknowledgedSequence(): Long =
        // Read from encrypted SharedPreferences backed by Android Keystore
        sharedPrefs.getLong("metastrate_last_ack", 0L)

    private fun persistLastAck(seq: Long) =
        sharedPrefs.edit().putLong("metastrate_last_ack", seq).apply()
}

@Serializable
data class AssetEvent(
    val type: String,          // "SCAN" | "DIAGNOSTICS_UPDATE" | "MAINTENANCE_FLAG"
    val assetId: String,
    val payload: JsonObject,
)

@Serializable
data class LedgerEvent(
    val sequence: Long,
    val hash: String,
    val previousHash: String,
    val events: List<AssetEvent>,
)`,
      },
    ],
    subsections: [
      {
        id: 'metastrate-keystore',
        title: 'Device Key Pair Generation',
        content: [
          'The Ed25519 signing key is generated in the Android Hardware-backed Keystore on first launch. The public key is registered with the Metastrate Substrate during device enrollment. The private key is marked StrongBoxBacked where the Qualcomm SPU (Secure Processing Unit) is available (Quest 3 supports this on firmware 65.0+).',
        ],
        codeSnippets: [
          {
            language: 'kotlin',
            filename: 'VectraKeyStore.kt',
            code: `class VectraKeyStore(context: Context) {

    companion object {
        private const val KEY_ALIAS = "vectra_xr_substrate_signing_key"
    }

    private val keyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }

    fun getOrCreateSigningKey(): KeyPair {
        if (!keyStore.containsAlias(KEY_ALIAS)) {
            val spec = KeyPairGeneratorSpec.Builder(context)
                .setAlias(KEY_ALIAS)
                .setKeyType("EC")
                .setKeySize(256)
                .setDigests(KeyProperties.DIGEST_SHA256)
                .setIsStrongBoxBacked(true) // Uses Qualcomm SPU if available
                .build()
            KeyPairGenerator.getInstance("EC", "AndroidKeyStore")
                .apply { initialize(spec) }
                .generateKeyPair()
        }
        return KeyPair(
            keyStore.getCertificate(KEY_ALIAS).publicKey,
            keyStore.getKey(KEY_ALIAS, null) as PrivateKey,
        )
    }

    fun sign(data: ByteArray): ByteArray {
        val key = keyStore.getKey(KEY_ALIAS, null) as PrivateKey
        return Signature.getInstance("SHA256withECDSA").run {
            initSign(key)
            update(data)
            sign()
        }
    }
}`,
          },
        ],
      },
    ],
  },
]

export const SIDEBAR_SECTIONS = DOC_SECTIONS.map((s) => ({
  id: s.id,
  label: s.navTitle,
  children: (s.subsections ?? []).map((sub) => ({
    id: sub.id,
    label: sub.title,
  })),
}))
