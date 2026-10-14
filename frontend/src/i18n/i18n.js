import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      brand: {
        title: 'InsightFlow',
        subtitle: 'Powered by Adaption Labs',
        tag: 'Build Battle 2026'
      },
      nav: {
        copilot: 'Noesis Copilot',
        dashboard: 'Dashboard',
        decision: 'Decision Intelligence',
        issues: 'Issue Tracker',
        launch: 'Launch Workspace',
        overview: 'Perception Matrix',
        feedback: 'Feedback Explorer',
        adaption: 'Adaptive Data Studio',
        matrix: 'Decision Intelligence',
        kanban: 'Cloud Issue Tracker',
        reports: 'Executive Briefings',
        explainer: "Judges' Architecture"
      },
      topbar: {
        upload_dataset: 'Upload Dataset',
        records: 'records',
        verified: 'verified records',
        settings: 'Preferences & Settings',
        sign_out: 'Sign Out',
        operator: 'Enterprise Operator',
        active_dataset: 'Active Dataset',
        dataset_name: 'feedback_oct_2026'
      },
      sidebar: {
        workspace: 'Workspace',
        active_dataset: 'Active dataset',
        dataset_name: 'feedback_oct_2026',
        records_verified: '7,002 verified records',
        sign_out: 'Sign Out'
      },
      dashboard: {
        overview_badge: 'OVERVIEW / OCTOBER 1–7, 2026',
        title: 'Dashboard',
        subtitle: 'The customer signal, organized by severity and operational impact. Synthesized across 7,002 verified touchpoints.',
        generate_report: 'Generate Adaption Report',
        total_feedback: 'TOTAL FEEDBACK',
        high_risk: 'HIGH-RISK EXPOSURE',
        net_csat: 'NET CSAT SCORE',
        adaption_quality: 'ADAPTION QUALITY',
        daily_volume: 'Daily Ingestion Volume',
        severity_dist: 'Severity Distribution',
        category_telemetry: 'Category Risk Telemetry',
        explore_records: 'Explore 7,000 Records',
        critical: 'Critical',
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        adaption_studio_title: 'Adaption Living Data Conditioning Studio',
        adaptive_active_badge: 'ADAPTIVE ACTIVE — ENGINE ENGAGED',
        adaption_desc: 'Real-time semantic conditioning pipeline processing 7,002 customer touchpoints into high-fidelity decision intelligence.',
        dedup_title: 'Semantic Deduplication',
        rephrase_title: 'Emotional Normalization',
        traces_title: '3-Hop Causal Tracing',
        blueprint_title: 'PII & Compliance Blueprint',
        quality_lift: 'Quality Score Lift',
        tokens_saved: 'Tokens Saved',
        annual_savings: 'Annualized Savings',
        compute_credits: 'Compute Credits',
        view_report: 'View Adaption Report',
        run_batch: 'Re-run Conditioning Batch',
        before_raw: 'Raw Unconditioned Customer Signal',
        after_adapted: 'Conditioned Adaption Signal (with Causal Trace)'
      },
      copilot: {
        title: 'Noesis Adaptive Copilot',
        subtitle: 'Living Data Intelligence & Autonomous Decision Engine',
        placeholder: 'Ask Noesis Copilot anything about the 7,002 feedback records...',
        btn_report: '📊 Generate Adaption Report',
        btn_fraud: '🛡️ Explain 3DS Fraud',
        btn_dedup: '⚡ Show Deduplication Savings',
        btn_top_issues: '🔍 Top Operational Issues',
        btn_dispatch: 'Dispatch Ticket',
        report_title: 'Adaption Living Data Executive Report',
        download_md: 'Download Report (.md)',
        print_pdf: 'Print / Export PDF'
      },
      report: {
        modal_title: 'Adaption Labs Executive Cognitive Briefing',
        scope: 'Scope: 7,002 Multi-channel Customer Records',
        exec_summary: '1. Executive Summary & Severity Remediation',
        conditioning_lift: '2. Living Data Quality Uplift (Adaption Labs)',
        directives: '3. Autonomous Prioritization Directives',
        autoscientist: '4. AutoScientist LoRA Hyperparameters',
        download_pdf: 'Print / Download PDF',
        download_md: 'Download Markdown (.md)',
        download_json: 'Download JSON',
        close: 'Close'
      },
      stages: {
        stage1_badge: 'Stage 01 • The Critical Failure Mode',
        stage1_title: 'Traditional AI is Blind to Catastrophic Severity.',
        stage1_desc: 'Legacy sentiment engines treat a 1-star packaging tear identically to a $45,000 off-platform wire fraud exploit. When 7,002 customer complaints flood in, catastrophic churn signals vanish inside noisy semantic fog.',
        stage2_badge: 'Stage 02 • Living Data Conditioning',
        stage2_title: 'The Adaption Living Data Funnel.',
        stage2_desc: "As raw reviews funnel into Adaption's conditioning engine, active recipes sanitize hyperbole, compress 14.2% duplicate noise, redact PII, and attach verified causal reasoning traces.",
        stage3_badge: 'Stage 03 • Actionable Decision Velocity',
        stage3_title: 'From Chaotic Text to Prioritized Decisions.',
        stage3_desc: 'Customer friction is filtered into verified, role-conditioned actions with instant Supabase cloud synchronization.'
      },
      metrics: {
        unstructured_volume: 'Unstructured Volume',
        churn_risk: 'Severe Churn Risk',
        data_quality: 'Baseline Data Quality',
        noise_reduction: 'Prompt Deduplication',
        adapted_uplift: 'Adapted Quality Uplift',
        causality: 'Causality Attached'
      },
      lens: {
        label: 'Adaptive Lens:',
        executive: 'Elena Vance (CEO)',
        support: 'Marcus Chen (Support CX)',
        fraud: 'Sarah Jenkins (Fraud & Safety)'
      },
      kanban: {
        open: 'Open',
        in_progress: 'In Progress',
        resolved: 'Resolved',
        create_ticket: 'Promote to Ticket'
      }
    }
  },
  te: {
    translation: {
      brand: {
        title: 'ఇన్‌సైట్‌ఫ్లో (InsightFlow)',
        subtitle: 'అడాప్షన్ ల్యాబ్స్ ఆధ్వర్యంలో',
        tag: 'బిల్డ్ బాటిల్ 2026'
      },
      nav: {
        copilot: 'నోయెసిస్ కోపైలట్',
        dashboard: 'డ్యాష్‌బోర్డ్',
        decision: 'డెసిషన్ ఇంటెలిజెన్స్',
        issues: 'ఇష్యూ ట్రాకర్',
        launch: 'వర్క్‌స్పేస్ ప్రారంభించండి',
        overview: 'పర్సెప్షన్ మ్యాట్రిక్స్',
        feedback: 'ఫీడ్‌బ్యాక్ ఎక్స్‌ప్లోరర్',
        adaption: 'అడాప్టివ్ డేటా స్టూడియో',
        matrix: 'డెసిషన్ ఇంటెలిజెన్స్',
        kanban: 'క్లౌడ్ ఇష్యూ ట్రాకర్',
        reports: 'ఎగ్జిక్యూటివ్ బ్రీఫింగ్స్',
        explainer: 'జడ్జెస్ ఆర్కిటెక్చర్'
      },
      topbar: {
        upload_dataset: 'డేటాసెట్ అప్‌లోడ్',
        records: 'రికార్డులు',
        verified: 'ధృవీకరించబడిన రికార్డులు',
        settings: 'ప్రాధాన్యతలు & సెట్టింగ్‌లు',
        sign_out: 'లాగ్ అవుట్',
        operator: 'ఎంటర్‌ప్రైజ్ ఆపరేటర్',
        active_dataset: 'యాక్టివ్ డేటాసెట్',
        dataset_name: 'feedback_oct_2026'
      },
      sidebar: {
        workspace: 'వర్క్‌స్పేస్',
        active_dataset: 'యాక్టివ్ డేటాసెట్',
        dataset_name: 'feedback_oct_2026',
        records_verified: '7,002 ధృవీకరించబడిన రికార్డులు',
        sign_out: 'లాగ్ అవుట్'
      },
      dashboard: {
        overview_badge: 'అవలోకనం / అక్టోబర్ 1–7, 2026',
        title: 'డ్యాష్‌బోర్డ్',
        subtitle: 'కస్టమర్ సిగ్నల్, తీవ్రత మరియు నిర్వహణ ప్రభావం ఆధారంగా వర్గీకరించబడింది. 7,002 రికార్డుల నుండి విశ్లేషించబడింది.',
        generate_report: 'అడాప్షన్ నివేదిక రూపొందించండి',
        total_feedback: 'మొత్తం ఫీడ్‌బ్యాక్',
        high_risk: 'తీవ్ర నష్ట ముప్పు',
        net_csat: 'నెట్ CSAT స్కోరు',
        adaption_quality: 'అడాప్షన్ నాణ్యత',
        daily_volume: 'రోజువారీ డేటా పరిమాణం',
        severity_dist: 'తీవ్రత విభజన',
        category_telemetry: 'కేటగిరీ రిస్క్ టెలిమెట్రీ',
        explore_records: '7,000 రికార్డులను అన్వేషించండి',
        critical: 'క్రిటికల్',
        high: 'హై',
        medium: 'మీడియం',
        low: 'లో',
        adaption_studio_title: 'అడాప్షన్ లివింగ్ డేటా కండిషనింగ్ స్టూడియో',
        adaptive_active_badge: 'అడాప్టివ్ యాక్టివ్ — ఇంజిన్ పనిచేస్తోంది',
        adaption_desc: '7,002 కస్టమర్ ఫిర్యాదులను నాణ్యమైన నిర్ణయ సమాచారంగా మార్చే లైవ్ సెమాంటిక్ డేటా ఇంజిన్.',
        dedup_title: 'సెమాంటిక్ డూప్లికేషన్ తగ్గింపు',
        rephrase_title: 'ఎమోషనల్ నార్మలైజేషన్',
        traces_title: '3-హాప్ కారణ విశ్లేషణ',
        blueprint_title: 'వ్యక్తిగత సమాచార రక్షణ (PII)',
        quality_lift: 'నాణ్యత స్కోరు పెరుగుదల',
        tokens_saved: 'టోకెన్లు ఆదా చేయబడ్డాయి',
        annual_savings: 'వార్షిక పొదుపు',
        compute_credits: 'కంప్యూట్ క్రెడిట్స్',
        view_report: 'అడాప్షన్ నివేదిక చూడండి',
        run_batch: 'కండిషనింగ్ మళ్లీ రన్ చేయండి',
        before_raw: 'అసలైన కస్టమర్ సమీక్ష (ముడి సమాచారం)',
        after_adapted: 'అడాప్షన్ శుద్ధి చేసిన సమాచారం (కారణ విశ్లేషణతో)'
      },
      copilot: {
        title: 'నోయెసిస్ అడాప్టివ్ కోపైలట్',
        subtitle: 'లివింగ్ డేటా ఇంటెలిజెన్స్ & ఆటోనామస్ డెసిషన్ ఇంజిన్',
        placeholder: '7,002 కస్టమర్ రికార్డుల గురించి ఏదైనా అడగండి...',
        btn_report: '📊 అడాప్షన్ నివేదిక రూపొందించండి',
        btn_fraud: '🛡️ 3DS మోసం వివరణ',
        btn_dedup: '⚡ డూప్లికేషన్ పొదుపు వివరాలు',
        btn_top_issues: '🔍 ప్రధాన నిర్వహణ సమస్యలు',
        btn_dispatch: 'టికెట్ పంపండి',
        report_title: 'అడాప్షన్ లివింగ్ డేటా ఎగ్జిక్యూటివ్ రిపోర్ట్',
        download_md: 'రిపోర్ట్ డౌన్‌లోడ్ (.md)',
        print_pdf: 'పిడిఎఫ్ ప్రింట్ / ఎగుమతి'
      },
      report: {
        modal_title: 'అడాప్షన్ ల్యాబ్స్ ఎగ్జిక్యూటివ్ కాగ్నిటివ్ బ్రీఫింగ్',
        scope: 'పరిధి: 7,002 బహుళ ఛానల్ కస్టమర్ రికార్డులు',
        exec_summary: '1. ఎగ్జిక్యూటివ్ సారాంశం & తీవ్రత నివారణ',
        conditioning_lift: '2. లివింగ్ డేటా నాణ్యత మెరుగుదల (అడాప్షన్ ల్యాబ్స్)',
        directives: '3. అత్యవసర పరిష్కార ఆదేశాలు',
        autoscientist: '4. ఆటోసైంటిస్ట్ మోడల్ పారామితులు',
        download_pdf: 'ప్రింట్ / పిడిఎఫ్ డౌన్‌లోడ్',
        download_md: 'మార్క్‌డౌన్ డౌన్‌లోడ్ (.md)',
        download_json: 'జావాస్క్రిప్ట్ ఆబ్జెక్ట్ డౌన్‌లోడ్ (JSON)',
        close: 'మూసివేయి'
      },
      stages: {
        stage1_badge: 'దశ 01 • తీవ్రతను గుర్తించలేని వైఫల్యం',
        stage1_title: 'సాంప్రదాయ కృత్రిమ మేధ తీవ్రమైన మోసాలను గుర్తించలేదు.',
        stage1_desc: 'సాధారణ ప్యాకేజింగ్ సమస్యను మరియు $45,000 ఆన్‌లైన్ వైర్ స్కామ్‌ను పాత సెంటిమెంట్ ఇంజిన్లు ఒకే విధంగా చూస్తాయి. 7,002 కస్టమర్ సమీక్షలు వచ్చినప్పుడు కీలకమైన నష్ట సంకేతాలు దాగిపోతాయి.',
        stage2_badge: 'దశ 02 • లివింగ్ డేటా శుద్ధి ప్రక్రియ',
        stage2_title: 'అడాప్షన్ లివింగ్ డేటా ఫన్నెల్.',
        stage2_desc: 'అడాప్షన్ డేటా ఇంజిన్ ద్వారా అసలైన సమీక్షలు ప్రవహించినప్పుడు, 14.2% అనవసరమైన నకిలీలను తొలగించి, వ్యక్తిగత సమాచారాన్ని రక్షించి, స్పష్టమైన కారణాలను జోడిస్తుంది.',
        stage3_badge: 'దశ 03 • వేగవంతమైన నిర్ణయాల వేదిక',
        stage3_title: 'అస్తవ్యస్తమైన డేటా నుండి ప్రాధాన్యతా నిర్ణయాలు.',
        stage3_desc: 'కస్టమర్ సమస్యలు ధృవీకరించబడిన పరిష్కారాలుగా మారి సుపాబేస్ క్లౌడ్‌లో తక్షణమే భద్రపరచబడతాయి.'
      },
      metrics: {
        unstructured_volume: 'మొత్తం సమీక్షలు',
        churn_risk: 'ఆదాయ నష్ట ముప్పు',
        data_quality: 'ప్రారంభ డేటా నాణ్యత',
        noise_reduction: 'నకిలీల తొలగింపు',
        adapted_uplift: 'మెరుగైన నాణ్యత',
        causality: 'కారణాల విశ్లేషణ'
      },
      lens: {
        label: 'అడాప్టివ్ లెన్స్:',
        executive: 'ఎలెనా వాన్స్ (సిఇఓ)',
        support: 'మార్కస్ చెన్ (కస్టమర్ సపోర్ట్)',
        fraud: 'సారా జెంకిన్స్ (ఫ్రాడ్ & సేఫ్టీ)'
      },
      kanban: {
        open: 'ఓపెన్',
        in_progress: 'పురోగతిలో ఉంది',
        resolved: 'పరిష్కరించబడింది',
        create_ticket: 'టికెట్‌గా మార్చండి'
      }
    }
  },
  hi: {
    translation: {
      brand: {
        title: 'इनसाइटफ्लो (InsightFlow)',
        subtitle: 'अडॉप्टशन लैब्स द्वारा संचालित',
        tag: 'बिल्ड बैटल 2026'
      },
      nav: {
        copilot: 'नोएसिस कोपायलट',
        dashboard: 'डैशबोर्ड',
        decision: 'निर्णय बुद्धिमत्ता',
        issues: 'इश्यू ट्रैकर',
        launch: 'कार्यक्षेत्र शुरू करें',
        overview: 'परसेप्शन मैट्रिक्स',
        feedback: 'फीडबैक एक्सप्लोरर',
        adaption: 'अडॉप्टिव डेटा स्टूडियो',
        matrix: 'निर्णय बुद्धिमत्ता',
        kanban: 'क्लाउड इश्यू ट्रैकर',
        reports: 'कार्यकारी ब्रीफिंग',
        explainer: 'जज वास्तुकला'
      },
      topbar: {
        upload_dataset: 'डेटासेट अपलोड करें',
        records: 'रिकॉर्ड्स',
        verified: 'सत्यापित रिकॉर्ड्स',
        settings: 'प्राथमिकताएं और सेटिंग्स',
        sign_out: 'साइन आउट',
        operator: 'एंटरप्राइज ऑपरेटर',
        active_dataset: 'सक्रिय डेटासेट',
        dataset_name: 'feedback_oct_2026'
      },
      sidebar: {
        workspace: 'कार्यक्षेत्र',
        active_dataset: 'सक्रिय डेटासेट',
        dataset_name: 'feedback_oct_2026',
        records_verified: '7,002 सत्यापित रिकॉर्ड',
        sign_out: 'साइन आउट'
      },
      dashboard: {
        overview_badge: 'अवलोकन / 1–7 अक्टूबर, 2026',
        title: 'डैशबोर्ड',
        subtitle: 'ग्राहक सिग्नल, गंभीरता और परिचालन प्रभाव द्वारा व्यवस्थित। 7,002 सत्यापित बिंदुओं से संश्लेषित।',
        generate_report: 'अडॉप्टशन रिपोर्ट तैयार करें',
        total_feedback: 'कुल फीडबैक',
        high_risk: 'उच्च जोखिम जोखिम',
        net_csat: 'नेट सीएसएटी स्कोर',
        adaption_quality: 'अडॉप्टशन गुणवत्ता',
        daily_volume: 'दैनिक अंतर्ग्रहण मात्रा',
        severity_dist: 'गंभीरता वितरण',
        category_telemetry: 'श्रेणी जोखिम टेलीमेट्री',
        explore_records: '7,000 रिकॉर्ड देखें',
        critical: 'गंभीर',
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'निम्न',
        adaption_studio_title: 'अडॉप्टशन लिविंग डेटा कंडीशनिंग स्टूडियो',
        adaptive_active_badge: 'अनुकूली सक्रिय — इंजन सक्रिय',
        adaption_desc: 'शोरगुल वाली 7,002 ग्राहक शिकायतों को उच्च-गुणवत्ता निर्णय बुद्धिमत्ता में बदलने वाली लाइव पाइपलाइन।',
        dedup_title: 'सिमेंटिक डुप्लिकेट निष्कासन',
        rephrase_title: 'भावनात्मक सामान्यीकरण',
        traces_title: '3-हॉप कारण अनुरेखण',
        blueprint_title: 'पीआईआई सुरक्षा ब्लूप्रिंट',
        quality_lift: 'गुणवत्ता स्कोर वृद्धि',
        tokens_saved: 'टोकन बचाए गए',
        annual_savings: 'वार्षिक बचत',
        compute_credits: 'कंप्यूट क्रेडिट्स',
        view_report: 'अडॉप्टशन रिपोर्ट देखें',
        run_batch: 'कंडीशनिंग फिर से चलाएं',
        before_raw: 'कच्ची ग्राहक शिकायत (शोरगुल युक्त)',
        after_adapted: 'शुद्ध अडॉप्टशन सिग्नल (कारण विश्लेषण सहित)'
      },
      copilot: {
        title: 'नोएसिस अनुकूली कोपायलट',
        subtitle: 'लिविंग डेटा इंटेलिजेंस और निर्णय इंजन',
        placeholder: '7,002 फीडबैक रिकॉर्ड के बारे में कुछ भी पूछें...',
        btn_report: '📊 अडॉप्टशन रिपोर्ट तैयार करें',
        btn_fraud: '🛡️ 3DS धोखाधड़ी समझाएं',
        btn_dedup: '⚡ डुप्लिकेट बचत दिखाएं',
        btn_top_issues: '🔍 शीर्ष परिचालन समस्याएं',
        btn_dispatch: 'टिकट भेजें',
        report_title: 'अडॉप्टशन लिविंग डेटा कार्यकारी रिपोर्ट',
        download_md: 'रिपोर्ट डाउनलोड करें (.md)',
        print_pdf: 'पीडीएफ प्रिंट / निर्यात'
      },
      report: {
        modal_title: 'अडॉप्टशन लैब्स कार्यकारी संज्ञानात्मक ब्रीफिंग',
        scope: 'दायरा: 7,002 मल्टी-चैनल ग्राहक रिकॉर्ड',
        exec_summary: '1. कार्यकारी सारांश और गंभीरता निवारण',
        conditioning_lift: '2. लिविंग डेटा गुणवत्ता वृद्धि (अडॉप्टशन लैब्स)',
        directives: '3. स्वायत्त प्राथमिकता निर्देश',
        autoscientist: '4. ऑटोसाइंटिस्ट मॉडल पैरामीटर्स',
        download_pdf: 'प्रिंट / पीडीएफ डाउनलोड करें',
        download_md: 'मार्कडाउन डाउनलोड करें (.md)',
        download_json: 'जेएसओएन डाउनलोड करें',
        close: 'बंद करें'
      },
      stages: {
        stage1_badge: 'चरण 01 • गंभीरता अंधापन विफलता',
        stage1_title: 'पारंपरिक एआई गंभीर धोखाधड़ी को पहचानने में असमर्थ है।',
        stage1_desc: 'पारंपरिक सेंटिमेंट इंजन पैकेजिंग क्षति और $45,000 के वायर फ्रॉड को समान मानते हैं। जब 7,002 शिकायतें आती हैं, तो वित्तीय नुकसान के संकेत शोर में छिप जाते हैं।',
        stage2_badge: 'चरण 02 • जीवंत डेटा शुद्धिकरण फ़नल',
        stage2_title: 'अडॉप्टशन लिविंग डेटा फ़नल।',
        stage2_desc: 'अडॉप्टशन इंजन के माध्यम से 14.2% डुप्लिकेट शोर समाप्त होता है, पीआईआई सुरक्षित होती है, और मूल कारण स्पष्ट रूप से जोड़े जाते हैं।',
        stage3_badge: 'चरण 03 • त्वरित निर्णय प्रक्रिया',
        stage3_title: 'अव्यवस्थित पाठ से प्राथमिकता प्राप्त निर्णय।',
        stage3_desc: 'ग्राहक समस्याओं को भूमिका-आधारित प्राथमिकताओं में बदलकर तुरंत सुपाबेस क्लाउड में सिंक किया जाता है।'
      },
      metrics: {
        unstructured_volume: 'कुल समीक्षाएं',
        churn_risk: 'गंभीर राजस्व जोखिम',
        data_quality: 'डेटा गुणवत्ता',
        noise_reduction: 'डुप्लिकेट कमी',
        adapted_uplift: 'सुधरी हुई गुणवत्ता',
        causality: 'कारण विश्लेषण'
      },
      lens: {
        label: 'अनुकूली लेंस:',
        executive: 'ऐलेना वेंस (सीईओ)',
        support: 'मार्कस चेन (सपोर्ट प्रमुख)',
        fraud: 'सारा जेनकिंस (धोखाधड़ी निवारण)'
      },
      kanban: {
        open: 'खुला',
        in_progress: 'प्रगति पर है',
        resolved: 'हल किया गया',
        create_ticket: 'टिकट बनाएं'
      }
    }
  }
};

const initialLang =
  (typeof window !== 'undefined' &&
    (localStorage.getItem('noesis_lang') || localStorage.getItem('insightflow_lang'))) ||
  'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
