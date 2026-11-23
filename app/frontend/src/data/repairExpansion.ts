// First-wave bilingual repair offerings. Publish only after a capability/parts review.
// Each page owns a distinct repair procedure; do not add excluded services here.
import type { ServiceEntity, WebPageEntity } from '../types/knowledgeGraph';

export const REPAIR_EXPANSION = [
  {
    "slug": "laptop-cleaning-thermal-paste-kuwait",
    "id": "srv-laptop-thermal-service",
    "title": "Laptop Cleaning & Thermal Paste Service Kuwait",
    "arabicTitle": "تنظيف اللابتوب وتبديل المعجون الحراري بالكويت",
    "primary": "laptop cleaning thermal paste Kuwait",
    "photo": "/images/gallery/laptop-fan-and-heatsink-deep-cleaning-kuwait.webp",
    "pricingPhoto": "/images/gallery/laptop-cpu-thermal-paste-reapplication-intel-core.webp",
    "parent": "/laptop-repair-kuwait",
    "related": [
      "srv-laptop",
      "srv-gaming-laptop-cleaning"
    ],
    "symptoms": [
      "Fan runs loudly during light work",
      "Airflow is weak or dust is visible in the vents",
      "Temperature rises faster than it used to",
      "Performance drops under sustained workload"
    ],
    "checks": [
      "Inspect intake, exhaust and heatsink fins for obstructed airflow",
      "Check fan behaviour and measure temperatures with a repeatable workload",
      "Clean accessible internal components safely and assess thermal-interface condition",
      "Replace thermal material only where the model and observed condition justify it; retest"
    ],
    "faqs": [
      [
            "How much does laptop cleaning and thermal paste service cost in Kuwait?",
            "Our published guide range for standard laptop thermal service is 15–20 KWD, with free initial diagnosis. Exact work and the total are quoted for your model before paid service; fan replacement or other repairs are priced separately."
      ],
      [
            "How often should I clean my laptop in Kuwait?",
            "For regularly used laptops, a cooling-system inspection roughly every 12–18 months can be useful in dusty environments, or sooner if vents become blocked or fans grow louder. Thermal paste is replaced based on condition, not a fixed calendar."
      ],
      [
            "Does every laptop need new thermal paste every year?",
            "No. Clearing dust does not automatically justify removing a heatsink. We leave a healthy factory thermal interface undisturbed unless testing or disassembly warrants replacement."
      ],
      [
            "Will cleaning and repasting fix every overheating problem?",
            "No. A failing fan, damaged heat pipe, high background load, battery issue or motherboard fault can create similar symptoms. We diagnose before recommending a repair."
      ],
      [
            "How long does the laptop thermal service take?",
            "The published typical turnaround for a straightforward thermal service is same day or within 24 hours, subject to the lab queue, model and parts availability. Timing is confirmed after inspection."
      ],
      [
            "Are my files affected during laptop cleaning?",
            "Cooling maintenance normally does not erase files, but no hardware service can guarantee data integrity. Back up important files first; KCROC does not offer data recovery."
      ],
      [
            "Do you clean gaming laptops and MacBooks too?",
            "Gaming-laptop cleaning has a dedicated specialist service page, and MacBook Air/Pro requests are handled through our separate MacBook repair service after model verification."
      ],
      [
            "Is pickup and delivery free throughout Kuwait?",
            "Yes. Free pickup and return are offered across Kuwait for eligible repair bookings; cleaning and testing take place at the Hawalli lab, not at customers' homes."
      ],
      [
            "Can I just spray compressed air into my laptop vents instead of booking internal cleaning?",
            "External compressed air can move lint deeper into narrow heatsink fins and, if a fan spins freely at excessive speed, stress its bearings or electronics. Safe internal cleaning uses a model-appropriate opening and clears the blocked fin stack directly after isolating power."
      ],
      [
            "Why does my office or study laptop get hot during Zoom calls, browser tabs, or charging?",
            "Video calls, background updates, browser hardware acceleration and charging power profiles can raise processor load and fan speed. Restricted airflow or degraded thermal contact may add to the heat, so we inspect workload, fan behaviour and the cooling path before recommending work."
      ],
      [
            "Do I need to share my Windows login password for laptop cleaning and thermal paste service?",
            "A Windows password is not needed for physical opening, dust removal, fan inspection or condition-based thermal material service. If a Windows-level thermal check would help, we discuss a privacy-respecting test arrangement with you first, without requesting access to personal files."
      ],
      [
            "What if inspection shows a failed fan or motherboard fault instead of a dust issue?",
            "Our Hawalli repair lab can diagnose a faulty fan, temperature-control circuit, charging or motherboard power fault. We explain the finding and provide a separate quote before any additional paid repair. For broader faults, see our laptop repair service."
      ]
],
    "scope": "Standard Windows laptop dust cleaning, airflow checks and condition-based thermal maintenance; gaming laptops and MacBooks have separate service paths.",
    "ar": {
      "intro": "صوت مروحة اللابتوب عالي أو الجهاز يسخن مع الشغل العادي؟ نفحص الحرارة والهواء أول، وننظف الغبار ونبدّل المعجون إذا احتاج فعلاً.",
      "symptoms": [
        "صوت المروحة عالي حتى مع الاستخدام الخفيف",
        "فتحات التهوية مسدودة أو دفع الهواء ضعيف",
        "الجهاز يسخن أسرع من قبل",
        "الأداء يهبط بعد فترة من الشغل"
      ],
      "checks": [
        "نفحص فتحات التهوية والمشتت وتراكم الغبار",
        "نقيس الحرارة وسلوك المروحة تحت حمل مناسب",
        "ننظف الأجزاء الداخلية الممكن الوصول لها بأمان",
        "نقيّم المعجون الحراري حسب الموديل ونعيد الاختبار بعد الخدمة"
      ],
      "faqs": [
      [
            "بكم تنظيف اللابتوب وتبديل المعجون بالكويت؟",
            "السعر الإرشادي لخدمة تبريد اللابتوب العادي 15–20 د.ك، والفحص الأولي مجاني. نحدد السعر النهائي بعد فحص الموديل وقبل الشغل، وأي مروحة أو قطعة إضافية لها عرض سعر مستقل."
      ],
      [
            "كل جم لازم أنظف اللابتوب بالكويت؟",
            "إذا الجهاز يُستخدم يومياً وفيه غبار، ممكن يفيد فحص التبريد تقريباً كل 12–18 شهر، أو قبل إذا ضعف الهواء أو ارتفع صوت المروحة. المعجون ما له جدول ثابت."
      ],
      [
            "لازم أبدّل المعجون كل سنة؟",
            "لا. إذا الحرارة طبيعية والمعجون الأصلي مناسب والمشتت ما يحتاج ينفك، ما نغيّره لمجرد مرور سنة."
      ],
      [
            "التنظيف يحل كل مشاكل الحرارة؟",
            "مو بالضرورة. ممكن العطل من المروحة أو المشتت أو برامج تستهلك المعالج أو البطارية أو دائرة الطاقة. نفحص السبب أول."
      ],
      [
            "جم تاخذ خدمة التنظيف والتبريد؟",
            "المدة المعتادة حسب قائمة الأسعار نفس اليوم أو خلال 24 ساعة للشغل البسيط، حسب زحمة المختبر والموديل وتوفر القطع. نأكدها عقب الفحص."
      ],
      [
            "ملفاتي تتأثر من التنظيف؟",
            "الخدمة المعتادة ما تمسح الملفات، لكن أي صيانة هاردوير لها مخاطر على البيانات. احتفظ بنسخة احتياطية قبل الخدمة؛ ما نقدم استرجاع بيانات."
      ],
      [
            "تنظفون لابتوبات القيمنق والماك بوك؟",
            "القيمنق له صفحة تبريد متخصصة، والماك بوك له مسار تصليح منفصل حسب الموديل وطريقة الفك."
      ],
      [
            "التوصيل والاستلام مجاني بكل الكويت؟",
            "نعم، نوفر استلام وتوصيل مجاني للحجوزات المؤهلة بجميع مناطق الكويت. الفحص والشغل في مختبر حولي، مو داخل بيت العميل."
      ],
      [
            "أقدر أنفخ هواء مضغوط من فتحات اللابتوب بدل التنظيف الداخلي؟",
            "الهواء المضغوط إذا انستخدم بطريقة غلط ممكن يدفع الوبر لداخل زعانف المشتت، أو يخلي المروحة تدور بسرعة تضرها. التنظيف الداخلي الآمن يعتمد على طريقة فتح مناسبة للموديل وعزل الطاقة وتنظيف مكان الانسداد نفسه."
      ],
      [
            "ليش لابتوب الدوام أو الدراسة يسخن وقت Zoom أو التصفح أو مع الشاحن؟",
            "مكالمات الفيديو وتحديثات Windows والخدمات اللي تشتغل بالخلفية ووضع الشحن ممكن تزيد حمل المعالج وصوت المروحة. إذا الغبار مسكر مجرى الهواء أو التلامس الحراري ضعيف، تزيد الأعراض. نفحص الحمل والمروحة والتبريد قبل ما نقترح شغل."
      ],
      [
            "لازم أعطيكم كلمة مرور Windows عشان تنظفون اللابتوب أو تبدلون المعجون؟",
            "ما نحتاج كلمة مرور Windows لفك الجهاز وتنظيف الغبار وفحص المروحة وخدمة المعجون حسب الحالة. إذا احتجنا اختبار حرارة داخل النظام، نتفق معاك أول على طريقة تحافظ على الخصوصية من غير طلب الوصول لملفاتك الشخصية."
      ],
      [
            "إذا طلع العطل من المروحة أو المذربورد مو من الغبار، شنو يصير؟",
            "مختبرنا بحولي يقدر يفحص المروحة ودوائر التحكم والشحن والطاقة بالمذربورد. نشرح لك العطل ونعطيك عرض سعر منفصل قبل أي تصليح إضافي مدفوع. للأعطال الأوسع شوف خدمة تصليح اللابتوب."
      ]
],
      "scope": "تنظيف وفحص تبريد لابتوبات Windows العادية، والمعجون حسب الفحص. القيمنق والماك بوك لهم خدمات منفصلة."
    }
  },
  {
    "slug": "laptop-fan-replacement-kuwait",
    "id": "srv-laptop-fan",
    "title": "Laptop Cooling Fan Replacement Kuwait",
    "arabicTitle": "تبديل مروحة اللابتوب بالكويت",
    "primary": "laptop fan replacement Kuwait",
    "photo": "/images/gallery/lenovo-laptop-replacement-cooling-fan-part-number-label-kuwait.webp",
    "pricingPhoto": "/images/gallery/lenovo-laptop-old-cooling-fan-removed-next-to-new-fan-installation-kuwait.webp",
    "parent": "/laptop-overheating-kuwait",
    "related": [
      "srv-laptop",
      "srv-gaming-laptop-cleaning"
    ],
    "symptoms": [
      "Fan rattles, grinds or clicks",
      "Fan remains stationary when it should run",
      "Cooling is intermittent or BIOS reports a fan error",
      "System shuts down as temperature rises"
    ],
    "checks": [
      "Verify airflow, fan speed signals and model-specific fan operation",
      "Separate dust obstruction from a failed bearing, cable or fan motor",
      "Match the fan assembly and connector to the exact model and revision",
      "Install compatible parts when available; verify fan control and operating temperature"
    ],
    "faqs": [
      [
        "Can a noisy fan be cleaned instead of replaced?",
        "Sometimes. Noise caused by debris may improve after inspection and cleaning; a worn bearing usually requires a correctly matched fan."
      ],
      [
        "Do you stock every laptop fan?",
        "No stock claim is made for every model. The model number and fan part number are checked before a replacement is ordered."
      ],
      [
        "Can a fan error be caused by the motherboard?",
        "Yes. The fan connector, control or power stage can also fail, which is why the diagnosis comes before replacement."
      ]
    ],
    "scope": "Fan replacement for compatible laptops after confirming the failed component and part availability.",
    "ar": {
      "intro": "مروحة اللابتوب تطق أو تحك أو ما تدور؟ نفحص المروحة وتوصيلاتها قبل ما نطلب قطعة بديلة.",
      "symptoms": [
        "المروحة تطق أو تطلع صوت احتكاك",
        "المروحة ما تدور وقت الحاجة",
        "تطلع رسالة Fan Error عند التشغيل",
        "الجهاز يسخن أو يطفي مع الحمل"
      ],
      "checks": [
        "نفحص دوران المروحة والتحكم فيها",
        "نفرق بين انسداد الغبار وعطل الموتور أو التوصيلة",
        "نطابق رقم المروحة مع موديل الجهاز",
        "نركّب القطعة المتوافقة بعد توفرها ونعيد اختبار الحرارة"
      ],
      "faqs": [
        [
          "إذا المروحة صوتها عالي لازم تتبدل؟",
          "مو دائمًا، مرات السبب غبار أو احتكاك. نفحصها أول، وإذا البيرنق تالف نحتاج بديل مناسب."
        ],
        [
          "عندكم مروحة لكل موديل؟",
          "ما نضمن توفر كل قطعة. نتأكد من موديل الجهاز ورقم القطعة قبل الطلب."
        ],
        [
          "ممكن تكون المشكلة من المذربورد؟",
          "نعم، خلل توصيل أو تحكم المروحة ممكن يعطي نفس الأعراض، والفحص يحدد السبب."
        ]
      ],
      "scope": "تبديل مروحة متوافقة بعد التأكد من العطل وتوفر القطعة."
    }
  },
  {
    "slug": "macbook-charging-port-repair-kuwait",
    "id": "srv-macbook-charging-port",
    "title": "MacBook USB-C Charging Port Repair Kuwait",
    "arabicTitle": "تصليح مدخل شحن ماك بوك USB-C بالكويت",
    "primary": "MacBook charging port repair Kuwait",
    "photo": "/images/gallery/macbook-pro-thunderbolt-usb-c-port-replacement-board-repair.webp",
    "pricingPhoto": "/images/gallery/macbook-pro-logic-board-power-section-usb-c-controller-chips.webp",
    "parent": "/macbook-repair-kuwait",
    "related": [
      "srv-macbook",
      "srv-charging-port",
      "srv-motherboard"
    ],
    "symptoms": [
      "MacBook charges only when a USB-C plug is held at an angle",
      "A charging port is loose, bent or visibly damaged",
      "The charger works with another device but the MacBook does not respond",
      "One port works for data but charging fails or disconnects"
    ],
    "checks": [
      "Identify the MacBook A-number, generation and supported input connectors",
      "Test a known-good compatible adapter and USB-C power-delivery negotiation",
      "Inspect port contacts and board-side charging components without forcing the connector",
      "Quote connector, daughterboard or logic-board work only after the faulty stage is established"
    ],
    "faqs": [
      [
        "Is every USB-C charging failure a broken port?",
        "No. The adapter, cable, controller and logic-board power rails can produce similar symptoms."
      ],
      [
        "Can you repair a MacBook USB-C port without replacing the whole board?",
        "Some models have a replaceable port board; others require board-level work. Feasibility depends on the exact model and damage."
      ],
      [
        "What if the port is hot or sparking?",
        "Disconnect power if safe and stop testing it. Arrange a diagnosis rather than continuing to plug and unplug the charger."
      ]
    ],
    "scope": "MacBook Air and Pro USB-C charging input diagnosis and model-dependent connector or power-path repair.",
    "ar": {
      "intro": "ماك بوك ما يشحن من USB-C أو الشحن يفصل؟ نفحص المدخل والشاحن ودائرة الطاقة ونحدد الحل حسب رقم الموديل.",
      "symptoms": [
        "الشحن يشتغل بس إذا حركت رأس USB-C",
        "مدخل الشحن مرتخٍ أو سنونه متضررة",
        "الشاحن سليم لكن الماك ما يستجيب",
        "منفذ يشتغل للداتا لكن الشحن يفصل"
      ],
      "checks": [
        "نحدد رقم موديل MacBook والجيل",
        "نختبر شاحن وكابل متوافقين وتفاوض USB-C PD",
        "نفحص سنون المنفذ ودائرة الشحن من غير ضغط على المدخل",
        "نوضح إذا الإصلاح يحتاج منفذ أو لوحة صغيرة أو عمل على اللوجك بورد"
      ],
      "faqs": [
        [
          "كل عطل شحن يعني المدخل خربان؟",
          "لا. ممكن يكون من الشاحن أو الكابل أو متحكم USB-C أو دائرة الطاقة."
        ],
        [
          "ينصلح المدخل بدون تغيير المذربورد؟",
          "بعض موديلات ماك فيها لوحة منافذ منفصلة، والبعض يحتاج فحص وإصلاح على مستوى المكونات."
        ],
        [
          "المدخل يسخن أو يشرر، شسوي؟",
          "افصل الكهرباء إذا تقدر بأمان ووقف التجربة. خلّ الفني يفحصه قبل أي شحن جديد."
        ]
      ],
      "scope": "فحص منافذ USB-C للماك بوك Air وPro، والإصلاح حسب الموديل وحالة البورد."
    }
  },
  {
    "slug": "bios-repair-kuwait",
    "id": "srv-bios-repair",
    "title": "BIOS & UEFI Firmware Repair Kuwait",
    "arabicTitle": "تصليح BIOS وUEFI للابتوب والكمبيوتر بالكويت",
    "primary": "BIOS repair Kuwait",
    "photo": "/images/gallery/asus-prime-z590-p-bios-ez-mode-core-i7-10700k.webp",
    "pricingPhoto": "/images/gallery/motherboard-repair-tools-bga-stencil-holder-tweezers-kuwait.webp",
    "parent": "/motherboard-repair-kuwait",
    "related": [
      "srv-motherboard",
      "srv-laptop",
      "srv-desktop-pc"
    ],
    "symptoms": [
      "Computer no longer reaches POST after a firmware update",
      "Black display appears with repeated recovery attempts",
      "BIOS settings cannot be retained after basic checks",
      "Model-specific firmware corruption or verification errors appear"
    ],
    "checks": [
      "Confirm power, RAM and display paths before blaming firmware",
      "Identify the exact board revision and OEM-approved recovery method",
      "Assess firmware integrity and whether supported SPI programming is appropriate",
      "Explain TPM, Secure Boot and BitLocker recovery-key risks before firmware changes"
    ],
    "faqs": [
      [
        "Does a black screen always require BIOS programming?",
        "No. RAM, power delivery, display, CPU and motherboard faults can all cause no-POST symptoms."
      ],
      [
        "Will BIOS repair bypass BitLocker or restore files?",
        "No. We do not offer file recovery, encryption bypass or data recovery. Preserve and verify your own BitLocker recovery key before approved firmware work."
      ],
      [
        "Do you update every BIOS chip?",
        "No. Programming depends on model support, board condition and having a verified compatible firmware image."
      ]
    ],
    "scope": "Firmware diagnosis and supported board-level recovery only; no encryption bypass or data recovery.",
    "ar": {
      "intro": "الجهاز وقف بعد تحديث BIOS أو ما يوصل لشاشة الإقلاع؟ نفحص أول إذا المشكلة من الفيرموير فعلًا أو من مكوّن ثاني.",
      "symptoms": [
        "الجهاز ما يكمل POST عقب تحديث BIOS",
        "شاشة سودا ومحاولات استعادة متكررة",
        "إعدادات BIOS ما تنحفظ بعد الفحص الأساسي",
        "رسائل خطأ فيرموير متكررة حسب الموديل"
      ],
      "checks": [
        "نفحص الطاقة والرام والشاشة قبل تشخيص الفيرموير",
        "نحدد موديل اللوحة وطريقة الاستعادة الرسمية",
        "نقيّم إمكانية برمجة شريحة SPI على الأجهزة المدعومة",
        "نوضح مخاطر TPM وSecure Boot ومفتاح BitLocker قبل أي تغيير"
      ],
      "faqs": [
        [
          "أي شاشة سودا معناها BIOS خربان؟",
          "لا. ممكن السبب الرام أو الطاقة أو الشاشة أو المذربورد، لذلك الفحص أول."
        ],
        [
          "تسترجعون ملفات BitLocker؟",
          "لا، ما نقدم استعادة بيانات أو تجاوز تشفير. احتفظ بمفتاح الاستعادة الخاص فيك قبل الموافقة."
        ],
        [
          "تبرمجون كل شرائح BIOS؟",
          "مو كل الموديلات مدعومة. لازم نتأكد من صورة الفيرموير الصحيحة وحالة اللوحة."
        ]
      ],
      "scope": "تشخيص الفيرموير والاستعادة للأجهزة المدعومة فقط، بدون استعادة بيانات أو تجاوز تشفير."
    }
  },
  {
    "slug": "pc-power-supply-replacement-kuwait",
    "id": "srv-desktop-psu",
    "title": "Desktop PC Power Supply Replacement Kuwait",
    "arabicTitle": "تبديل باور سبلاي الكمبيوتر المكتبي بالكويت",
    "primary": "PC power supply replacement Kuwait",
    "photo": "/images/gallery/hp-desktop-pc-opened-motherboard-psu-ssd-and-hard-drive-kuwait.webp",
    "pricingPhoto": "/images/gallery/dell-small-form-factor-desktop-interior-seagate-hdd-psu-kuwait.webp",
    "parent": "/desktop-pc-repair-kuwait",
    "related": [
      "srv-desktop-pc",
      "srv-gaming",
      "srv-motherboard"
    ],
    "symptoms": [
      "Tower does not power on despite a working outlet",
      "PC shuts off instantly under load",
      "Power supply emits unusual electrical noise or smell",
      "Fans briefly start and stop with no successful boot"
    ],
    "checks": [
      "Inspect external AC power, front-panel switch and board power path",
      "Test using appropriate controlled diagnostic equipment and a known-good PSU",
      "Confirm required wattage, connector compatibility, form factor and system limits",
      "Replace the sealed PSU with a compatible unit when the fault is established; test the complete PC"
    ],
    "faqs": [
      [
        "Do you repair a power supply internally?",
        "No. Desktop PSU assemblies contain hazardous stored energy. KCROC diagnoses the fault and replaces the sealed unit when appropriate; we do not advertise PSU circuit repair."
      ],
      [
        "Will a larger wattage always fix shutdowns?",
        "No. Instability can come from the motherboard, cables, cooling or other components. Testing comes first."
      ],
      [
        "Can I bring a custom gaming PC?",
        "Yes, for full-system diagnosis and compatible PSU replacement. Standalone graphics-card repair is not part of this service."
      ]
    ],
    "scope": "Full desktop and gaming PC PSU diagnosis and compatible sealed-unit replacement, not internal PSU repair.",
    "ar": {
      "intro": "الكمبيوتر المكتبي ما يشتغل أو يطفي فجأة؟ نفحص مسار الكهرباء ونبدّل وحدة PSU كاملة إذا ثبت عطلها.",
      "symptoms": [
        "الكمبيوتر ما يستجيب رغم سلامة الكهرباء",
        "يطفي فجأة وقت الضغط أو اللعب",
        "صوت كهربائي غريب أو ريحة من الباور",
        "المراوح تشتغل لحظة ثم توقف"
      ],
      "checks": [
        "نفحص الكهرباء الخارجية وزر التشغيل ومسار طاقة اللوحة",
        "نجرب فحص آمن باستخدام باور معروف سلامته",
        "نطابق الواط والتوصيلات وحجم PSU مع الجهاز",
        "نبدّل الوحدة المغلقة المتوافقة عند ثبوت العطل ونختبر الجهاز كامل"
      ],
      "faqs": [
        [
          "تصلحون الباور سبلاي من داخله؟",
          "لا، وحدة PSU فيها مكثفات خطرة. نفحص ونستبدل الوحدة كاملة عند الحاجة، وما نقدم إصلاح دوائرها الداخلية."
        ],
        [
          "باور أقوى يحل انطفاء الجهاز؟",
          "مو دائمًا. ممكن العطل من التبريد أو المذربورد أو التوصيلات، ولازم نشخّص أول."
        ],
        [
          "تقبلون كمبيوتر قيمنق كامل؟",
          "نعم لفحص جهاز كامل وتبديل PSU المتوافق. ما نقدم تصليح كرت شاشة منفصل."
        ]
      ],
      "scope": "فحص وتبديل وحدة PSU مغلقة للكمبيوتر المكتبي والقيمنق، بدون إصلاح داخلي لها."
    }
  },
  {
    "slug": "macbook-liquid-damage-repair-kuwait",
    "id": "srv-macbook-liquid",
    "title": "MacBook Liquid Damage Repair Kuwait",
    "arabicTitle": "تصليح ماك بوك بعد انسكاب السوائل بالكويت",
    "primary": "MacBook liquid damage repair Kuwait",
    "photo": "/images/gallery/macbook-pro-16-m1-logic-board-motherboard-repair.webp",
    "pricingPhoto": "/images/gallery/macbook-logic-board-cleaning-crc-contact-cleaner.webp",
    "parent": "/macbook-repair-kuwait",
    "related": [
      "srv-macbook",
      "srv-liquid-damage",
      "srv-motherboard"
    ],
    "symptoms": [
      "Coffee, tea or water was spilled on a MacBook",
      "MacBook stopped charging or powering on after a spill",
      "Keyboard, trackpad or ports behave erratically after liquid contact",
      "Corrosion or moisture may have reached the logic board"
    ],
    "checks": [
      "Advise immediate shutdown and disconnection from external power where safe",
      "Inspect the affected model, battery safety and visible liquid paths before applying power",
      "Assess connectors, keyboard and logic-board corrosion under controlled conditions",
      "Offer a model-dependent repair quote only after confirming what can safely be repaired and tested"
    ],
    "faqs": [
      [
        "Should I switch on the MacBook to see if it still works?",
        "No. Keep it off, do not charge it, and arrange an inspection. Repeated power tests can increase damage."
      ],
      [
        "Can you guarantee a spill-damaged MacBook will be fixed?",
        "No. Corrosion, damaged multilayer boards and inaccessible assemblies can make a repair uneconomical or impossible. We diagnose before quoting."
      ],
      [
        "Is this a data recovery service?",
        "No. KCROC diagnoses and repairs the original device hardware where feasible; it does not offer data recovery, file extraction or recovery guarantees."
      ]
    ],
    "scope": "Hardware-only liquid-damage assessment and compatible MacBook logic-board repair; no data recovery.",
    "ar": {
      "intro": "انكب ماي أو قهوة على الماك بوك؟ خلّ الجهاز مطفي ولا تشحنه. نفحص آثار السوائل والمكونات المتضررة بالمختبر قبل أي تجربة تشغيل.",
      "symptoms": [
        "انكب ماي أو شاي أو قهوة على MacBook",
        "الجهاز وقف تشغيل أو شحن بعد الانسكاب",
        "الكيبورد أو التاتش باد أو المنافذ صار فيها خلل",
        "احتمال وصل السائل للوجك بورد"
      ],
      "checks": [
        "نوضح ضرورة إيقاف التشغيل وفصل الشاحن بأمان",
        "نفحص الموديل والبطارية ومسار دخول السائل قبل توصيل الكهرباء",
        "نفحص الموصلات والكيبورد وآثار التآكل على اللوجك بورد",
        "نوضح إمكانية الإصلاح والتكلفة بعد التشخيص والاختبار"
      ],
      "faqs": [
        [
          "أشغّل الماك وأجرب بعد الانسكاب؟",
          "لا. خله مطفي ولا تشحنه؛ التجربة ممكن تزيد الضرر."
        ],
        [
          "تضمنون تصليح كل جهاز متضرر؟",
          "لا، بعض الأعطال أو التآكل تكون غير قابلة للإصلاح أو ما تسوى تكلفتها. نوضح النتيجة بعد الفحص."
        ],
        [
          "تسترجعون الملفات من الماك؟",
          "لا، الخدمة للهاردوير فقط، وما نقدم استعادة بيانات أو استخراج ملفات."
        ]
      ],
      "scope": "فحص وإصلاح هاردوير الماك بعد السوائل حسب الحالة، بدون استعادة بيانات."
    }
  }
] as const;


const ROOT = 'https://www.computerrepairkuwait.com';
const stamp = '2026-11-23T00:00:00+03:00';
export const REPAIR_EXPANSION_ENTITIES: Record<string, ServiceEntity | WebPageEntity> =
  Object.fromEntries(REPAIR_EXPANSION.flatMap((item) => {
    const enUrl = ROOT + '/' + item.slug;
    const arUrl = ROOT + '/ar/' + item.slug;
    const alternates = { 'en-KW': enUrl, 'ar-KW': arUrl, 'x-default': enUrl };
    const enFaqs = item.faqs.map(([title, answer], i) => ({ id: item.id + '-faq-' + i, title, answer }));
    const service = {
      id: item.id, slug: item.slug, entityType: 'Service', isActive: true,
      title: item.title, primaryKeyword: item.primary,
      description: item.scope + ' ' + item.checks.join('. '),
      shortDescription: item.scope, iconKey: 'cpu', repairLevel: 'specialist',
      estimatedTurnaround: 'Confirmed after model inspection and parts availability',
      relatedServiceIds: [...item.related], relatedProblemIds: [],
      relatedBrandIds: [], relatedResourcePaths: [{ label: 'Related repair service', path: item.parent }],
      relatedLocationIds: ['loc-hawalli'], relatedCaseStudyIds: [],
      contentImages: [
        { src: item.photo, alt: item.title + ' - repair process illustration from KCROC image library', placement: 'hero' },
        { src: item.pricingPhoto, alt: item.title + ' - complementary internal component view', placement: 'coreFeatures' },
      ],
      coreFeatures: [...item.checks], faqs: enFaqs,
      seo: { title: item.slug === 'laptop-cleaning-thermal-paste-kuwait' ? 'Laptop Cleaning & Thermal Paste Service Kuwait (15–20 KWD) | KCROC' : item.title + ' | KCROC', description: item.slug === 'laptop-cleaning-thermal-paste-kuwait'
        ? 'Loud fan or hot everyday laptop in Kuwait? Free initial diagnosis, internal dust cleaning and condition-based thermal paste at our Hawalli lab. Guide 15–20 KWD. Free pickup.'
        : item.scope + ' Diagnosis at our Hawalli lab. Kuwait-wide pickup, quote before work and 30-day warranty on covered completed repairs.',
        canonicalUrl: enUrl, locale: 'en_KW', alternates, ogType: 'website',
        ogImage: item.photo, ogImageAlt: item.title + ' - KCROC technical service image',
        schemaTypes: item.slug === 'laptop-cleaning-thermal-paste-kuwait' ? ['Service', 'WebPage', 'BreadcrumbList', 'LocalBusiness', 'FAQPage'] : ['Service', 'WebPage', 'BreadcrumbList', 'LocalBusiness'],
        lastModified: item.slug === 'laptop-cleaning-thermal-paste-kuwait' ? '2026-11-24T00:00:00+03:00' : stamp,
        breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: item.title, url: '/' + item.slug }] }
    } as ServiceEntity;
    const arPage = {
      id: 'page-ar-' + item.id, slug: 'ar/' + item.slug,
      entityType: 'WebPage', isActive: true, title: item.arabicTitle,
      description: item.ar.intro + ' ' + item.ar.scope,
      relatedServiceIds: [item.id],
      seo: { title: item.slug === 'laptop-cleaning-thermal-paste-kuwait' ? item.arabicTitle + ' | السعر 15–20 د.ك | KCROC' : item.arabicTitle + ' | KCROC', description: item.slug === 'laptop-cleaning-thermal-paste-kuwait' ? 'اللابتوب يسخن أو المروحة صوتها عالي؟ فحص أولي مجاني وتنظيف داخلي ومعجون حراري حسب الحالة بمختبر حولي. السعر الإرشادي 15–20 د.ك واستلام وتوصيل مجاني بالكويت.' : item.ar.intro + ' فحص في مختبر حولي واستلام وتوصيل بالكويت، وعرض سعر قبل التصليح.',
        canonicalUrl: arUrl, locale: 'ar_KW', alternates, ogType: 'website',
        ogImage: item.photo, ogImageAlt: item.arabicTitle,
        schemaTypes: item.slug === 'laptop-cleaning-thermal-paste-kuwait' ? ['WebPage', 'BreadcrumbList', 'LocalBusiness', 'FAQPage'] : ['WebPage', 'BreadcrumbList', 'LocalBusiness'],
        lastModified: item.slug === 'laptop-cleaning-thermal-paste-kuwait' ? '2026-11-24T00:00:00+03:00' : stamp,
        breadcrumbs: [{ name: 'الرئيسية', url: '/ar' }, { name: 'الخدمات', url: '/ar/services' }, { name: item.arabicTitle, url: '/ar/' + item.slug }] }
    } as WebPageEntity;
    return [[service.id, service], [arPage.id, arPage]];
  }));
