export interface HerbData {
  name: string;
  slug: string;
  solarTerm: string;
  solarTermSlug: string;
  season: "spring" | "summer" | "autumn" | "winter";
  characterImage: string;
  greeting: string;
  nature: string;
  meridian: string;
  effects: string;
  contraindications: string;
  teaNote: string;
  order: number;
}

export interface CompatibilityData {
  herbA: string;
  herbB: string;
  isCompatible: "safe" | "caution" | "forbidden";
  note: string;
}

export interface RecipeData {
  name: string;
  herbs: string[];
  effects: string;
  drinkNote: string;
  sceneTag: string;
}

export const herbsData: HerbData[] = [
  {
    name: "红枣", slug: "hongzao", solarTerm: "立春", solarTermSlug: "lichun", season: "spring",
    characterImage: "/images/herb-hongzao.png", greeting: "春天到啦，气色也要像花儿一样红润哦~",
    nature: "甘温", meridian: "脾、胃、心", effects: "补中益气、养血安神。适合气血不足、面色萎黄的人。",
    contraindications: "湿盛脘腹胀满、食积、虫积、龋齿作痛者慎用。",
    teaNote: "可配枸杞、桂圆、当归等温补气血的药材。", order: 1,
  },
  {
    name: "灵芝", slug: "lingzhi", solarTerm: "雨水", solarTermSlug: "yushui", season: "spring",
    characterImage: "/images/herb-lingzhi.png", greeting: "春雨绵绵，让我来帮你祛湿安神吧~",
    nature: "甘平", meridian: "心、肺、肝、肾", effects: "补气安神、止咳平喘。适合心神不宁、失眠多梦。",
    contraindications: "实证及外感初起者不宜。",
    teaNote: "可配百合、西洋参，安神又不上火。", order: 2,
  },
  {
    name: "山药", slug: "shanyao", solarTerm: "惊蛰", solarTermSlug: "jingzhe", season: "spring",
    characterImage: "/images/herb-shanyao.png", greeting: "轰隆隆~醒醒吧，肠胃该活动活动啦~",
    nature: "甘平", meridian: "脾、肺、肾", effects: "补脾养胃、生津益肺、补肾涩精。脾肺肾三脏皆补。",
    contraindications: "湿盛中满或有实邪、积滞者不宜。",
    teaNote: "可配莲子、芡实，健脾益气效果佳。", order: 3,
  },
  {
    name: "百合", slug: "baihe", solarTerm: "春分", solarTermSlug: "chunfen", season: "spring",
    characterImage: "/images/herb-baihe.png", greeting: "春分时阴阳平衡，来杯百合茶清心润燥吧~",
    nature: "甘微寒", meridian: "心、肺", effects: "养阴润肺、清心安神。适合阴虚燥咳、失眠多梦。",
    contraindications: "风寒咳嗽及中寒便溏者忌服。",
    teaNote: "可配莲子、枸杞，清心安神不上火。", order: 4,
  },
  {
    name: "桑葚", slug: "sangshen", solarTerm: "清明", solarTermSlug: "qingming", season: "spring",
    characterImage: "/images/herb-sangshen.png", greeting: "清明时节，眼睛干涩吗？看我乌发明目哦~",
    nature: "甘酸寒", meridian: "肝、肾", effects: "滋阴补血、生津润燥。适合肝肾不足、须发早白。",
    contraindications: "脾胃虚寒便溏者不宜多食。",
    teaNote: "可配枸杞、菊花，养肝明目。", order: 5,
  },
  {
    name: "枸杞子", slug: "gouqi", solarTerm: "谷雨", solarTermSlug: "guyu", season: "spring",
    characterImage: "/images/herb-gouqi.png", greeting: "谷雨前后采的枸杞最甜，养肝明目就选我~",
    nature: "甘平", meridian: "肝、肾", effects: "滋补肝肾、益精明目。适合肝肾阴虚、目昏不明。",
    contraindications: "外感实热、脾虚泄泻者不宜。",
    teaNote: "百搭之王！可配菊花、红枣、桂圆等。", order: 6,
  },
  {
    name: "莲子", slug: "lianzi", solarTerm: "立夏", solarTermSlug: "lixia", season: "summer",
    characterImage: "/images/herb-lianzi.png", greeting: "立夏心火旺，吃莲心，虽苦但清心哦~",
    nature: "甘涩平", meridian: "脾、肾、心", effects: "补脾止泻、养心安神、益肾固精。",
    contraindications: "中满痞胀、大便燥结者不宜。",
    teaNote: "可配百合、红枣，养心安神效果佳。", order: 7,
  },
  {
    name: "苦菜", slug: "kucai", solarTerm: "小满", solarTermSlug: "xiaoman", season: "summer",
    characterImage: "/images/herb-kucai.png", greeting: "小满吃苦，胜似进补。清热解毒我第一~",
    nature: "苦寒", meridian: "心、肝、胃", effects: "清热解毒、凉血利湿。适合热毒疮痈、湿热黄疸。",
    contraindications: "脾胃虚寒者不宜。",
    teaNote: "可配淡竹叶、菊花，清热解暑。", order: 8,
  },
  {
    name: "淡竹叶", slug: "danzhuye", solarTerm: "芒种", solarTermSlug: "mangzhong", season: "summer",
    characterImage: "/images/herb-danzhuye.png", greeting: "芒种闷热，一杯竹叶水，消暑利尿~",
    nature: "甘淡寒", meridian: "心、胃、小肠", effects: "清热除烦、利尿。适合热病烦渴、口舌生疮。",
    contraindications: "无实火、湿热者慎用，孕妇不宜。",
    teaNote: "可配菊花、薄荷，清凉解暑。", order: 9,
  },
  {
    name: "石斛", slug: "shihu", solarTerm: "夏至", solarTermSlug: "xiazhi", season: "summer",
    characterImage: "/images/herb-shihu.png", greeting: "夏至日长，熬夜伤身？石斛帮你滋阴清热~",
    nature: "甘微寒", meridian: "胃、肾", effects: "益胃生津、滋阴清热。适合热病伤津、口干烦渴。",
    contraindications: "湿温尚未化燥者忌服，感冒初期不宜。",
    teaNote: "可配西洋参、麦冬，滋阴生津。", order: 10,
  },
  {
    name: "藿香", slug: "huoxiang", solarTerm: "小暑", solarTermSlug: "xiaoshu", season: "summer",
    characterImage: "/images/herb-huoxiang.png", greeting: "小暑大暑，上蒸下煮。带上我，防中暑~",
    nature: "辛微温", meridian: "脾、胃、肺", effects: "芳香化浊、开胃止呕、发表解暑。适合暑湿感冒、恶心呕吐。",
    contraindications: "阴虚火旺、胃热呕逆者不宜。",
    teaNote: "可配佩兰、薄荷，芳香化湿解暑。", order: 11,
  },
  {
    name: "西洋参", slug: "xiyangshen", solarTerm: "大暑", solarTermSlug: "dashu", season: "summer",
    characterImage: "/images/herb-xiyangshen.png", greeting: "大热天没力气？我来给你补补气，还不会上火~",
    nature: "甘微苦凉", meridian: "心、肺、肾", effects: "补气养阴、清热生津。适合气阴两伤、虚热烦倦。",
    contraindications: "中阳衰微、胃有寒湿者忌服。不宜与萝卜、浓茶同用。",
    teaNote: "可配石斛、麦冬，气阴双补。", order: 12,
  },
  {
    name: "蜂蜜", slug: "fengmi", solarTerm: "立秋", solarTermSlug: "liqiu", season: "autumn",
    characterImage: "/images/herb-fengmi.png", greeting: "秋风起，皮肤干燥？蜂蜜润肺又养颜~",
    nature: "甘平", meridian: "肺、脾、大肠", effects: "补中润燥、止痛解毒、养颜润肤。",
    contraindications: "痰湿内蕴、中满痞胀及便溏者不宜。一岁以下婴儿禁食。",
    teaNote: "可配柠檬、菊花，润肺清热。", order: 13,
  },
  {
    name: "牛蒡", slug: "niubang", solarTerm: "处暑", solarTermSlug: "chushu", season: "autumn",
    characterImage: "/images/herb-niubang.png", greeting: "处暑时节秋燥起，牛蒡帮你清热解毒、润肠通便~",
    nature: "辛苦凉", meridian: "肺、胃", effects: "疏散风热、宣肺透疹、解毒利咽。",
    contraindications: "脾虚便溏者慎用。",
    teaNote: "可配菊花、枸杞，清肝明目。", order: 14,
  },
  {
    name: "桂圆", slug: "guiyuan", solarTerm: "白露", solarTermSlug: "bailu", season: "autumn",
    characterImage: "/images/herb-guiyuan.png", greeting: "白露为霜，手脚冰凉？桂圆帮你补心脾、益气血~",
    nature: "甘温", meridian: "心、脾", effects: "补益心脾、养血安神。适合心脾虚损、失眠健忘。",
    contraindications: "湿盛中满或有停饮、痰、火者不宜。",
    teaNote: "可配红枣、当归，温补气血。", order: 15,
  },
  {
    name: "银杏叶", slug: "yinxingye", solarTerm: "秋分", solarTermSlug: "qiufen", season: "autumn",
    characterImage: "/images/herb-yinxingye.png", greeting: "秋分平分昼夜，银杏叶活血化瘀、益智健脑~",
    nature: "甘苦涩平", meridian: "心、肺", effects: "活血化瘀、通络止痛、敛肺平喘。",
    contraindications: "有实邪者忌用，孕妇慎用。不宜与抗凝药物同用。",
    teaNote: "可配山楂、菊花，活血降脂。", order: 16,
  },
  {
    name: "菊花", slug: "juhua", solarTerm: "寒露", solarTermSlug: "hanlu", season: "autumn",
    characterImage: "/images/herb-juhua.png", greeting: "寒露时节风渐凉，菊花疏散风热、平肝明目~",
    nature: "辛甘苦微寒", meridian: "肺、肝", effects: "疏散风热、平肝明目、清热解毒。适合风热感冒、目赤肿痛。",
    contraindications: "气虚胃寒、食少泄泻者慎用。",
    teaNote: "可配枸杞、决明子，养肝明目。", order: 17,
  },
  {
    name: "银耳", slug: "yiner", solarTerm: "霜降", solarTermSlug: "shuangjiang", season: "autumn",
    characterImage: "/images/herb-yiner.png", greeting: "霜降天冷皮肤干燥？银耳滋阴润肺、养颜美容~",
    nature: "甘淡平", meridian: "肺、胃、肾", effects: "滋阴润肺、养胃生津、美容养颜。",
    contraindications: "风寒咳嗽、湿痰壅盛者不宜。",
    teaNote: "可配百合、莲子，滋阴润燥。", order: 18,
  },
  {
    name: "黄芪", slug: "huangqi", solarTerm: "立冬", solarTermSlug: "lidong", season: "winter",
    characterImage: "/images/herb-huangqi.png", greeting: "立冬阳气藏，黄芪帮你补气升阳、固表止汗~",
    nature: "甘微温", meridian: "脾、肺", effects: "补气升阳、固表止汗、利水消肿、生津养血。",
    contraindications: "表实邪盛、气滞湿阻、食积停滞、阴虚阳亢者不宜。",
    teaNote: "可配当归、红枣，气血双补。", order: 19,
  },
  {
    name: "人参", slug: "renshen", solarTerm: "冬至", solarTermSlug: "dongzhi", season: "winter",
    characterImage: "/images/herb-renshen.png", greeting: "冬至一阳生，人参大补元气、复脉固脱~",
    nature: "甘微苦微温", meridian: "脾、肺、心", effects: "大补元气、复脉固脱、补脾益肺、生津养血、安神益智。",
    contraindications: "实热证、湿热证、感冒发热者忌服。不宜与萝卜、藜芦同用。",
    teaNote: "可配黄芪、枸杞，元气满满。", order: 20,
  },
  {
    name: "肉苁蓉", slug: "roucongrong", solarTerm: "小雪", solarTermSlug: "xiaoxue", season: "winter",
    characterImage: "/images/herb-roucongrong.png", greeting: "小雪天渐寒，肉苁蓉温补肾阳、润肠通便~",
    nature: "甘咸温", meridian: "肾、大肠", effects: "补肾阳、益精血、润肠通便。适合肾阳不足、精血亏虚。",
    contraindications: "阴虚火旺、大便溏泄、实热便秘者不宜。",
    teaNote: "可配枸杞、杜仲，温补肾阳。", order: 21,
  },
  {
    name: "杜仲", slug: "duzhong", solarTerm: "大雪", solarTermSlug: "daxue", season: "winter",
    characterImage: "/images/herb-duzhong.png", greeting: "大雪封山腰易酸，杜仲补肝肾、强筋骨~",
    nature: "甘温", meridian: "肝、肾", effects: "补肝肾、强筋骨、安胎。适合肝肾不足、腰膝酸痛。",
    contraindications: "阴虚火旺者慎用。",
    teaNote: "可配枸杞、桑寄生，补肝肾强筋骨。", order: 22,
  },
  {
    name: "当归", slug: "danggui", solarTerm: "小寒", solarTermSlug: "xiaohan", season: "winter",
    characterImage: "/images/herb-danggui.png", greeting: "小寒地冻手脚凉，当归补血活血、调经止痛~",
    nature: "甘辛温", meridian: "肝、心、脾", effects: "补血活血、调经止痛、润肠通便。适合血虚萎黄、月经不调。",
    contraindications: "湿盛中满、大便溏泄者不宜。月经过多者慎用。",
    teaNote: "可配黄芪、红枣，气血双补。", order: 23,
  },
  {
    name: "鹿茸", slug: "lurong", solarTerm: "大寒", solarTermSlug: "dahan", season: "winter",
    characterImage: "/images/herb-lurong.png", greeting: "大寒补最宜，鹿茸补肾壮阳、益精养血~",
    nature: "甘咸温", meridian: "肾、肝", effects: "补肾壮阳、益精养血、强筋健骨。适合肾阳不足、精血亏虚。",
    contraindications: "阴虚阳亢、血分有热、高血压、感冒者忌服。",
    teaNote: "可配枸杞、人参，大补元气。", order: 24,
  },
];

export const compatibilityData: CompatibilityData[] = [
  { herbA: "人参", herbB: "西洋参", isCompatible: "safe", note: "二者同为参类，功效略有不同" },
  { herbA: "人参", herbB: "枸杞", isCompatible: "safe", note: "经典补气养阴搭配" },
  { herbA: "西洋参", herbB: "枸杞", isCompatible: "safe", note: "气阴双补经典方" },
  { herbA: "西洋参", herbB: "石斛", isCompatible: "safe", note: "滋阴清热佳品" },
  { herbA: "红枣", herbB: "桂圆", isCompatible: "safe", note: "气血双补经典搭配" },
  { herbA: "红枣", herbB: "枸杞", isCompatible: "safe", note: "日常养生常见搭配" },
  { herbA: "红枣", herbB: "当归", isCompatible: "safe", note: "补血调经经典方" },
  { herbA: "红枣", herbB: "黄芪", isCompatible: "safe", note: "补中益气经典搭配" },
  { herbA: "菊花", herbB: "枸杞", isCompatible: "safe", note: "养肝明目经典搭配" },
  { herbA: "莲子", herbB: "百合", isCompatible: "safe", note: "养心安神经典方" },
  { herbA: "莲子", herbB: "银耳", isCompatible: "safe", note: "滋阴安神搭配" },
  { herbA: "百合", herbB: "银耳", isCompatible: "safe", note: "滋阴润肺搭配" },
  { herbA: "黄芪", herbB: "当归", isCompatible: "safe", note: "当归补血汤核心配伍" },
  { herbA: "蜂蜜", herbB: "枸杞", isCompatible: "safe", note: "润肺养肝搭配" },
  { herbA: "桑葚", herbB: "枸杞", isCompatible: "safe", note: "滋补肝肾搭配" },
  { herbA: "鹿茸", herbB: "人参", isCompatible: "caution", note: "二者皆为峻补之品，同用易上火，体质虚弱者慎用" },
  { herbA: "鹿茸", herbB: "枸杞", isCompatible: "safe", note: "阴阳并补，缓和鹿茸温燥之性" },
  { herbA: "肉苁蓉", herbB: "枸杞", isCompatible: "safe", note: "补肾益精搭配" },
  { herbA: "杜仲", herbB: "枸杞", isCompatible: "safe", note: "补肝肾强筋骨" },
  { herbA: "当归", herbB: "桂圆", isCompatible: "safe", note: "补血养心搭配" },
  { herbA: "苦菜", herbB: "西洋参", isCompatible: "caution", note: "苦菜苦寒，西洋参性凉，虚寒体质不宜同用" },
  { herbA: "淡竹叶", herbB: "鹿茸", isCompatible: "forbidden", note: "淡竹叶寒凉清热，鹿茸温阳补肾，药性相反，不宜同用" },
  { herbA: "淡竹叶", herbB: "人参", isCompatible: "caution", note: "淡竹叶利尿清热，可能减弱人参补气功效" },
  { herbA: "牛蒡", herbB: "黄芪", isCompatible: "caution", note: "牛蒡性凉，黄芪性温，虚寒体质慎用" },
  { herbA: "蜂蜜", herbB: "苦菜", isCompatible: "caution", note: "蜂蜜补中润肠，苦菜清热泻下，作用方向不同" },
];

export const recipesData: RecipeData[] = [
  {
    name: "期末备考提神茶",
    herbs: ["gouqi", "xiyangshen", "juhua"],
    effects: "补气养阴、清肝明目，适合长时间用眼用脑的学生党，提神抗疲劳。",
    drinkNote: "枸杞滋补肝肾治本，西洋参补气提神不伤阴，菊花清肝明目。考前一周每日午后温饮1杯，忌空腹饮用。适合备考压力大、眼睛酸涩、精神不振的同学。",
    sceneTag: "期末备考",
  },
  {
    name: "军训防暑降温茶",
    herbs: ["danzhuye", "juhua", "xiyangshen"],
    effects: "清热解暑、生津止渴，有效缓解高温训练中的中暑症状。",
    drinkNote: "淡竹叶清心利尿解暑热，菊花散风热平肝阳，西洋参益气生津。训练前泡好放保温杯中，微温时饮用最佳。适合烈日下训练、口干舌燥、心烦气躁时饮用。",
    sceneTag: "军训防暑",
  },
  {
    name: "宿舍暖心晚安茶",
    herbs: ["hongzao", "guiyuan", "baihe"],
    effects: "养心安神、补血助眠，改善入睡困难、睡眠浅的问题。",
    drinkNote: "红枣补中益气养血，桂圆补益心脾安神，百合清心安神。三味合力养心血安心神，睡前1小时温服，可加少量红糖。适合失眠多梦、心悸不安、面色萎黄者。",
    sceneTag: "助眠安神",
  },
  {
    name: "女生暖宫调理茶",
    herbs: ["hongzao", "guiyuan", "danggui"],
    effects: "温补气血、调经止痛，适合经期腹痛、手脚冰凉的女生。",
    drinkNote: "当归补血活血为君，红枣健脾益气为臣，桂圆养血安神为佐。经前3日至经期第1日温饮，经量过多者慎用。适合宫寒痛经、手脚冰凉、面色苍白的女生。",
    sceneTag: "女生暖宫",
  },
  {
    name: "熬夜修复元气茶",
    herbs: ["gouqi", "juhua", "lingzhi"],
    effects: "滋补肝肾、明目安神，缓解熬夜后的眼睛干涩和精神疲劳。",
    drinkNote: "枸杞滋补肝肾以补熬夜之耗，菊花清肝明目以解眼之疲，灵芝补气安神以复心神。次日晨起温饮，可反复冲泡至味淡。适合熬夜后目赤肿痛、精神萎靡、口干咽燥者。",
    sceneTag: "熬夜修复",
  },
  {
    name: "换季润肺防感茶",
    herbs: ["yiner", "baihe", "gouqi"],
    effects: "滋阴润肺、增强免疫，适合秋冬换季时干燥咳嗽、易感冒的人群。",
    drinkNote: "银耳滋阴润肺养胃，百合养阴清心安神，枸杞滋补肝肾。三味合力滋阴润燥，换季时每日1杯，可加蜂蜜调味。适合秋冬换季干咳少痰、皮肤干燥、容易感冒者。",
    sceneTag: "换季防感",
  },
  {
    name: "祛湿消肿轻盈茶",
    herbs: ["danzhuye", "lianzi", "baihe"],
    effects: "清热利湿、养心安神，适合湿热体质、容易水肿的人。",
    drinkNote: "淡竹叶清热利尿祛湿邪，莲子补脾止泻养心，百合养阴安神。适合梅雨季节或夏季湿热重、身体困重、面部浮肿、舌苔厚腻者饮用，体寒者减量。",
    sceneTag: "祛湿消肿",
  },
  {
    name: "运动恢复元气茶",
    herbs: ["xiyangshen", "gouqi", "hongzao"],
    effects: "补气养阴、恢复体力，适合运动后疲劳恢复、大汗淋漓后饮用。",
    drinkNote: "西洋参补气养阴生津，为运动后气阴两伤之佳品；枸杞滋补肝肾；红枣补中益气。运动后30分钟温饮，补充流失之气阴。适合运动后气短乏力、大汗淋漓、口干口渴者。",
    sceneTag: "运动恢复",
  },
];
