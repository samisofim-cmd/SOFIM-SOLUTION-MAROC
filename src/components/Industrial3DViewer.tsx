import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Eye, RefreshCw, ZoomIn, ZoomOut, CheckCircle2, ShieldAlert, Wrench, Info } from 'lucide-react';
import { SchemaNode } from '../types';

interface Industrial3DViewerProps {
  equipmentType: 'pont_roulant' | 'porte_sectionnelle' | 'armoire_tgbt' | 'securite_incendie';
  onSelectNode?: (node: SchemaNode) => void;
  selectedNodeId?: string;
}

export const HOTSPOTS_DATA: Record<string, SchemaNode[]> = {
  pont_roulant: [
    {
      id: 'palan',
      name: 'Palan Électrique à Câble 5T-20T',
      codeRef: 'LEV-PL-01',
      description: 'Unité de levage principale dotée de fin de course haut/bas, frein de sécurité à disque et variateur de vitesse.',
      maintenanceFrequency: 'Trimestrielle (Contrôle visuel du câble & frein)',
      safetyChecklist: [
        'Vérification de l’usure des torons du câble en acier',
        'Mesure de l’épaisseur des garnitures du frein de levage',
        'Essai de déclenchement du limiteur de charge (Epreuve 125%)'
      ],
      sparePartRef: 'REF-SOFIM-PALAN-5T',
      position3D: [0, 1.2, 0]
    },
    {
      id: 'sommier',
      name: 'Sommiers & Galets de Translation',
      codeRef: 'LEV-SM-02',
      description: 'Ensemble motorisé de translation du pont assurant le guidage sur les rails de roulement.',
      maintenanceFrequency: 'Semestrielle (Graissage & alignement des galets)',
      safetyChecklist: [
        'Inspection de la bande de roulement des galets',
        'Contrôle du jeu d’usure des boudins de guidage',
        'Serrage des boulons d’assemblage sommier/poutre'
      ],
      sparePartRef: 'REF-SOFIM-[#GALET-250]',
      position3D: [-3, 1.8, 0]
    },
    {
      id: 'armoire_commande',
      name: 'Armoire de Commande & Variateur',
      codeRef: 'LEV-ARM-03',
      description: 'Coffret électrique IP65 centralisant les variateurs Schneider/ABB, télécommande radio et protections.',
      maintenanceFrequency: 'Annuelle (Serrage borniers & thermographie)',
      safetyChecklist: [
        'Resserrement au couple des bornes de puissance',
        'Dépoussiérage des filtres de ventilation et contacteurs',
        'Test d’arrêt d’urgence de la boîte à boutons et radio'
      ],
      sparePartRef: 'REF-SOFIM-VAR-15KW',
      position3D: [2.5, 2, 0]
    }
  ],
  porte_sectionnelle: [
    {
      id: 'moteur_axe',
      name: 'Moteur d’Axe Triphasé & Parachute',
      codeRef: 'FER-MOT-01',
      description: 'Motorisation industrielle à arbre creux 400V avec manœuvre de secours par chaîne et secours à ressort.',
      maintenanceFrequency: 'Semestrielle (Contrôle niveau d’huile & fin de course)',
      safetyChecklist: [
        'Test de fonctionnement du parachute de rupture de câble',
        'Contrôle de l’équilibrage par l’axe d’enroulement',
        'Vérification du débrayage manuel de secours'
      ],
      sparePartRef: 'REF-SOFIM-MOT-400V',
      position3D: [0, 2.2, 0]
    },
    {
      id: 'barre_palpeuse',
      name: 'Cellule Photoélectrique & Barre Palpeuse',
      codeRef: 'FER-SEC-02',
      description: 'Système de sécurité opto-électronique au bas du tablier stoppant immédiatement la fermeture en cas d’obstacle.',
      maintenanceFrequency: 'Mensuelle (Nettoyage optiques & test d’impact)',
      safetyChecklist: [
        'Test d’inversion du sens de fermeture sur profil déformable',
        'Inspecter le faisceau des cellules photoélectriques réceptrices',
        'Remplacement des batteries du récepteur sans fil de sécurité'
      ],
      sparePartRef: 'REF-SOFIM-BAR-OPTO',
      position3D: [0, -1.5, 0.2]
    },
    {
      id: 'panneau_sandwich',
      name: 'Panneaux Isolants Isothermes 40mm',
      codeRef: 'FER-PAN-03',
      description: 'Section articulée en acier galvanisé laqué avec injecté de mousse polyuréthane haute densité.',
      maintenanceFrequency: 'Annuelle (Contrôle des charnières & roulettes)',
      safetyChecklist: [
        'Lubrification des roulettes de guidage en nylon',
        'Contrôle des joints d’étanchéité périphériques EPDM',
        'Vérification de l’alignement des rails verticaux'
      ],
      sparePartRef: 'REF-SOFIM-PAN-RAL9006',
      position3D: [0, 0, 0]
    }
  ],
  armoire_tgbt: [
    {
      id: 'disjoncteur_general',
      name: 'Disjoncteur Général Débrochable 1600A',
      codeRef: 'ELE-DISJ-01',
      description: 'Appareil de coupure principale avec déclencheur électronique Micrologic et télécommande.',
      maintenanceFrequency: 'Annuelle (Essai mécanique & contrôle thermographique)',
      safetyChecklist: [
        'Serrage des barres en cuivre au couple préconisé',
        'Contrôle par caméra infrarouge sous charge maximale',
        'Test d’extraction/débrochage de la cassette disjoncteur'
      ],
      sparePartRef: 'REF-SOFIM-DISJ-1600A',
      position3D: [0, 0.8, 0.3]
    },
    {
      id: 'parafoudre',
      name: 'Module Parafoudre & Protection Surtense',
      codeRef: 'ELE-PAR-02',
      description: 'Protection de Type 1+2 contre les surtensions d’origine atmosphérique et de manœuvre réseau.',
      maintenanceFrequency: 'Semestrielle (Vérification de la cartouche témoin)',
      safetyChecklist: [
        'Inspection de la fenêtre de voyant (vert = OK, rouge = HS)',
        'Mesure de la valeur de résistance de la prise de terre',
        'Contrôle du disjoncteur de déconnexion associé'
      ],
      sparePartRef: 'REF-SOFIM-PARAF-T1T2',
      position3D: [-0.6, 1.8, 0.3]
    }
  ],
  securite_incendie: [
    {
      id: 'devidoir_ria',
      name: 'Dévidoir Orientable RIA DN25 30m',
      codeRef: 'INC-RIA-01',
      description: 'Robinet d’Incendie Armé à alimentation permanente en eau sous pression (6 bars minimum).',
      maintenanceFrequency: 'Trimestrielle (Test d’épreuve sous pression)',
      safetyChecklist: [
        'Déroulement complet du tuyau semi-rigide sur 30 mètres',
        'Mesure du débit au jet diffusé et jet droit',
        'Graissage du tourillon d’alimentation et vanne'
      ],
      sparePartRef: 'REF-SOFIM-RIA-DN25',
      position3D: [0, 0, 0.2]
    },
    {
      id: 'extincteur_co2',
      name: 'Extincteur CO2 5Kg Feux Électriques',
      codeRef: 'INC-EXT-02',
      description: 'Extincteur à dioxyde de carbone pour feux de classe B et armoires électriques sous tension.',
      maintenanceFrequency: 'Annuelle (Pesée d’agent extincteur & contrôle d’épreuve)',
      safetyChecklist: [
        'Contrôle du poids total en charge (perte max 10%)',
        'Vérification de l’état du diffuseur orientable',
        'Plombage de la goupille de sécurité'
      ],
      sparePartRef: 'REF-SOFIM-EXT-CO2-5KG',
      position3D: [0.8, -0.6, 0.2]
    }
  ]
};

export const Industrial3DViewer: React.FC<Industrial3DViewerProps> = ({
  equipmentType,
  onSelectNode,
  selectedNodeId
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  const [explosionAmount, setExplosionAmount] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeNode, setActiveNode] = useState<SchemaNode | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const currentHotspots = HOTSPOTS_DATA[equipmentType] || [];

  // Initialize ThreeJS Scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x071629); // Deep industrial navy
    sceneRef.current = scene;

    // Grid helper & fog
    const gridHelper = new THREE.GridHelper(20, 20, 0xE85D2C, 0x1E385B);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    scene.fog = new THREE.FogExp2(0x071629, 0.03);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xE85D2C, 0.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 9);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Clean previous canvases
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Main Group to hold equipment 3D mesh
    const equipmentGroup = new THREE.Group();
    groupRef.current = equipmentGroup;
    scene.add(equipmentGroup);

    // Build model meshes based on selected equipmentType
    buildEquipmentMesh(equipmentType, equipmentGroup);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && groupRef.current && !isDragging.current) {
        groupRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [equipmentType]);

  // Handle Explosion Effect Animation
  useEffect(() => {
    if (!groupRef.current) return;

    const targetExplosion = exploded ? 1 : 0;
    setExplosionAmount(targetExplosion);

    // Traverse group to shift parts on explode
    groupRef.current.traverse((child) => {
      if (child.userData && child.userData.explodeOffset) {
        const offset = child.userData.explodeOffset as THREE.Vector3;
        const basePos = (child.userData.basePos as THREE.Vector3) || child.position.clone();
        if (!child.userData.basePos) child.userData.basePos = basePos.clone();

        if (exploded) {
          child.position.set(
            basePos.x + offset.x,
            basePos.y + offset.y,
            basePos.z + offset.z
          );
        } else {
          child.position.copy(basePos);
        }
      }
    });
  }, [exploded]);

  // Helper function to procedurally build 3D industrial geometries
  const buildEquipmentMesh = (type: string, group: THREE.Group) => {
    // Materials
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x3a4856,
      roughness: 0.3,
      metalness: 0.8
    });

    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xE85D2C,
      roughness: 0.4,
      metalness: 0.2
    });

    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xC7940A,
      roughness: 0.4,
      metalness: 0.2
    });

    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x111e2e,
      roughness: 0.5,
      metalness: 0.9
    });

    const glowHotspotMat = new THREE.MeshBasicMaterial({
      color: 0xE85D2C,
      wireframe: true
    });

    if (type === 'pont_roulant') {
      // Main Girder (Poutre)
      const girderGeo = new THREE.BoxGeometry(7, 0.4, 0.5);
      const girder = new THREE.Mesh(girderGeo, orangeMat);
      girder.position.set(0, 1.8, 0);
      group.add(girder);

      // End trucks (Sommiers gauche & droit)
      const truckGeo = new THREE.BoxGeometry(0.5, 0.3, 3);

      const leftTruck = new THREE.Mesh(truckGeo, darkSteelMat);
      leftTruck.position.set(-3.3, 1.8, 0);
      leftTruck.userData = { explodeOffset: new THREE.Vector3(-1, 0, 0) };
      group.add(leftTruck);

      const rightTruck = new THREE.Mesh(truckGeo, darkSteelMat);
      rightTruck.position.set(3.3, 1.8, 0);
      rightTruck.userData = { explodeOffset: new THREE.Vector3(1, 0, 0) };
      group.add(rightTruck);

      // Hoist Body (Palan électrique)
      const hoistGeo = new THREE.BoxGeometry(1.2, 0.9, 0.9);
      const hoist = new THREE.Mesh(hoistGeo, yellowMat);
      hoist.position.set(0, 1.2, 0);
      hoist.userData = { explodeOffset: new THREE.Vector3(0, -0.6, 0) };
      group.add(hoist);

      // Cable & Hook
      const cableGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 8);
      const cable = new THREE.Mesh(cableGeo, metalMat);
      cable.position.set(0, 0.2, 0);
      group.add(cable);

      const hookGeo = new THREE.TorusGeometry(0.2, 0.06, 8, 16, Math.PI * 1.5);
      const hook = new THREE.Mesh(hookGeo, darkSteelMat);
      hook.rotation.x = Math.PI / 2;
      hook.position.set(0, -0.6, 0);
      group.add(hook);
    } else if (type === 'porte_sectionnelle') {
      // Side Tracks
      const trackGeo = new THREE.BoxGeometry(0.15, 4, 0.2);
      const leftTrack = new THREE.Mesh(trackGeo, metalMat);
      leftTrack.position.set(-2.2, 0, 0);
      group.add(leftTrack);

      const rightTrack = new THREE.Mesh(trackGeo, metalMat);
      rightTrack.position.set(2.2, 0, 0);
      group.add(rightTrack);

      // Sectional Panels (4 panels stacked)
      for (let i = 0; i < 4; i++) {
        const panelGeo = new THREE.BoxGeometry(4.2, 0.9, 0.1);
        const panel = new THREE.Mesh(panelGeo, i % 2 === 0 ? darkSteelMat : orangeMat);
        panel.position.set(0, -1.35 + i * 0.95, 0);
        panel.userData = { explodeOffset: new THREE.Vector3(0, 0, (i + 1) * 0.3) };
        group.add(panel);
      }

      // Top Motor & Shaft
      const motorGeo = new THREE.CylinderGeometry(0.3, 0.3, 1, 16);
      const motor = new THREE.Mesh(motorGeo, yellowMat);
      motor.rotation.z = Math.PI / 2;
      motor.position.set(0, 2.2, 0);
      motor.userData = { explodeOffset: new THREE.Vector3(0, 0.8, 0) };
      group.add(motor);
    } else if (type === 'armoire_tgbt') {
      // Main Cabinet Shell
      const cabinetGeo = new THREE.BoxGeometry(2.5, 4, 1.2);
      const cabinet = new THREE.Mesh(cabinetGeo, darkSteelMat);
      cabinet.position.set(0, 0, 0);
      group.add(cabinet);

      // Busbars & Breakers inside
      for (let row = 0; row < 3; row++) {
        const breakerGeo = new THREE.BoxGeometry(1.8, 0.7, 0.4);
        const breaker = new THREE.Mesh(breakerGeo, row === 0 ? orangeMat : metalMat);
        breaker.position.set(0, 1 - row * 1.1, 0.3);
        breaker.userData = { explodeOffset: new THREE.Vector3(0, 0, 0.8) };
        group.add(breaker);
      }
    } else if (type === 'securite_incendie') {
      // Hose Reel Drum (Dévidoir RIA)
      const drumGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 24);
      const drum = new THREE.Mesh(drumGeo, orangeMat);
      drum.rotation.x = Math.PI / 2;
      drum.position.set(0, 0, 0);
      group.add(drum);

      // Center Hub
      const hubGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 16);
      const hub = new THREE.Mesh(hubGeo, metalMat);
      hub.rotation.x = Math.PI / 2;
      group.add(hub);

      // Extinguisher nearby
      const extGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.4, 16);
      const ext = new THREE.Mesh(extGeo, orangeMat);
      ext.position.set(1.5, -0.6, 0);
      ext.userData = { explodeOffset: new THREE.Vector3(0.8, 0, 0) };
      group.add(ext);
    }

    // Add Hotspot pins
    currentHotspots.forEach((spot) => {
      const pinGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const pinMesh = new THREE.Mesh(pinGeo, glowHotspotMat);
      pinMesh.position.set(...spot.position3D);
      pinMesh.userData = { isHotspot: true, nodeData: spot };
      group.add(pinMesh);
    });
  };

  // Mouse drag Orbit interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !groupRef.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    groupRef.current.rotation.y += deltaX * 0.01;
    groupRef.current.rotation.x += deltaY * 0.01;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleHotspotClick = (node: SchemaNode) => {
    setActiveNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.max(3, Math.min(15, cameraRef.current.position.z + delta));
  };

  const resetCamera = () => {
    if (!cameraRef.current || !groupRef.current) return;
    cameraRef.current.position.set(0, 2, 9);
    groupRef.current.rotation.set(0, 0, 0);
    setExploded(false);
  };

  return (
    <div className="relative w-full h-[520px] bg-[#071629] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between">
      
      {/* OVERLAY CONTROLS BAR */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="bg-[#0A1E38]/90 border border-white/10 px-3 py-1.5 backdrop-blur-md pointer-events-auto flex items-center space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#E85D2C] animate-pulse"></span>
          <span className="font-bold text-white uppercase tracking-wider">
            Rendu 3D WebGL Temps Réel
          </span>
        </div>

        {/* Action toolbar */}
        <div className="bg-[#0A1E38]/90 border border-white/10 p-1 backdrop-blur-md pointer-events-auto flex items-center space-x-1 text-xs">
          <button
            onClick={() => setExploded(!exploded)}
            className={`px-3 py-1.5 font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 ${
              exploded ? 'bg-[#E85D2C] text-white' : 'bg-white/5 text-slate-300 hover:text-white'
            }`}
            title="Vue Éclatée Organes & Composants"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Vue Éclatée</span>
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 transition-colors ${
              autoRotate ? 'text-[#C7940A] bg-white/10' : 'text-slate-400 hover:text-white'
            }`}
            title="Rotation Automatique"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleZoom(-1)}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10"
            title="Zoom + "
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleZoom(1)}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10"
            title="Zoom - "
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={resetCamera}
            className="px-2 py-1.5 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider"
          >
            Reset
          </button>
        </div>
      </div>

      {/* THREE JS CANVAS CONTAINER */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing relative"
      />

      {/* INTERACTIVE HOTSPOT QUICK BUTTONS OVERLAY */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2 max-w-xl pointer-events-auto">
        <div className="text-[10px] uppercase font-bold tracking-widest text-[#C9C2AE] w-full mb-0.5 flex items-center space-x-1">
          <Info className="w-3 h-3 text-[#E85D2C]" />
          <span>Composants d'inspection interactive :</span>
        </div>
        {currentHotspots.map((node) => (
          <button
            key={node.id}
            onClick={() => handleHotspotClick(node)}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border flex items-center space-x-1.5 ${
              activeNode?.id === node.id || selectedNodeId === node.id
                ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                : 'bg-[#0A1E38]/90 border-white/15 text-slate-200 hover:border-[#E85D2C]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{node.name}</span>
          </button>
        ))}
      </div>

      {/* SELECTED HOTSPOT DRAWER DETAIL PANEL */}
      {activeNode && (
        <div className="absolute top-16 right-4 z-30 w-80 sm:w-96 bg-[#0A1E38] border-2 border-[#E85D2C] p-5 shadow-2xl backdrop-blur-lg animate-in slide-in-from-right duration-200 text-white">
          <div className="flex items-start justify-between border-b border-white/10 pb-3 mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E85D2C] block">
                Fiche Technico-Maintenance
              </span>
              <h4 className="text-base font-extrabold text-white">{activeNode.name}</h4>
              <span className="text-[10px] font-mono text-slate-400">Réf. Code : {activeNode.codeRef}</span>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="text-slate-400 hover:text-white p-1 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3">{activeNode.description}</p>

          <div className="bg-[#071629] p-3 border border-white/10 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7940A] flex items-center space-x-1 mb-1">
              <Wrench className="w-3 h-3" />
              <span>Fréquence d'Intervention :</span>
            </span>
            <p className="text-xs font-semibold text-white">{activeNode.maintenanceFrequency}</p>
          </div>

          <div className="space-y-1.5 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
              <ShieldAlert className="w-3 h-3 text-[#E85D2C]" />
              <span>Checklist de Contrôle Sécurité :</span>
            </span>
            {activeNode.safetyChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[10px]">Pièce d'origine :</span>
            <span className="font-mono text-[#C9C2AE] font-bold">{activeNode.sparePartRef}</span>
          </div>
        </div>
      )}

    </div>
  );
};
