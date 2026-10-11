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
        launch: 'Launch Workspace',
        overview: 'Perception Matrix',
        feedback: 'Feedback Explorer',
        adaption: 'Adaptive Data Studio',
        matrix: 'Decision Intelligence',
        kanban: 'Cloud Issue Tracker',
        reports: 'Executive Briefings',
        explainer: "Judges' Architecture"
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
        launch: 'వర్క్‌స్పేస్ ప్రారంభించండి',
        overview: 'పర్సెప్షన్ మ్యాట్రిక్స్',
        feedback: 'ఫీడ్‌బ్యాక్ ఎక్స్‌ప్లోరర్',
        adaption: 'అడాప్టివ్ డేటా స్టూడియో',
        matrix: 'డెసిషన్ ఇంటెలిజెన్స్',
        kanban: 'క్లౌడ్ ఇష్యూ ట్రాకర్',
        reports: 'ఎగ్జిక్యూటివ్ బ్రీఫింగ్స్',
        explainer: 'జడ్జెస్ ఆర్కిటెక్చర్'
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
        launch: 'कार्यक्षेत्र शुरू करें',
        overview: 'परसेप्शन मैट्रिक्स',
        feedback: 'फीडबैक एक्सप्लोरर',
        adaption: 'अडॉप्टिव डेटा स्टूडियो',
        matrix: 'निर्णय बुद्धिमत्ता',
        kanban: 'क्लाउड इश्यू ट्रैकर',
        reports: 'कार्यकारी ब्रीफिंग',
        explainer: 'जज वास्तुकला'
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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('insightflow_lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
