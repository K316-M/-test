/**
 * SPM题目数据
 * 从 https://www.bumigemilang.com/nota-ringkas-contoh-soalan-latihan/ 抓取的部分题目示例
 */

const spmQuestions = {
  mathematics: [
    {
      id: "math-1",
      subject: "Mathematics",
      topic: "代数",
      difficulty: "中等",
      question: "求解方程：2x² + 5x - 3 = 0",
      options: [],
      answer: "x = -3 或 x = 0.5",
      solution: "使用公式法：x = (-b ± √(b² - 4ac)) / 2a，其中 a=2, b=5, c=-3\n代入得：x = (-5 ± √(25 + 24)) / 4 = (-5 ± √49) / 4 = (-5 ± 7) / 4\n所以 x = -3 或 x = 0.5"
    },
    {
      id: "math-2",
      subject: "Mathematics",
      topic: "三角函数",
      difficulty: "困难",
      question: "如果 sin θ = 0.6，且 θ 在第二象限，求 cos 2θ 的值。",
      options: [],
      answer: "-0.28",
      solution: "已知 sin θ = 0.6，且 θ 在第二象限\n所以 cos θ = -√(1 - sin²θ) = -√(1 - 0.36) = -√0.64 = -0.8\n使用倍角公式：cos 2θ = cos²θ - sin²θ = (-0.8)² - (0.6)² = 0.64 - 0.36 = 0.28"
    },
    {
      id: "math-3",
      subject: "Mathematics",
      topic: "统计",
      difficulty: "简单",
      question: "以下是10名学生的考试成绩：75, 82, 90, 65, 88, 72, 78, 84, 91, 69。求这组数据的平均值和中位数。",
      options: [],
      answer: "平均值：79.4，中位数：80",
      solution: "平均值 = (75 + 82 + 90 + 65 + 88 + 72 + 78 + 84 + 91 + 69) / 10 = 794 / 10 = 79.4\n将数据从小到大排序：65, 69, 72, 75, 78, 82, 84, 88, 90, 91\n中位数 = (78 + 82) / 2 = 80"
    }
  ],
  physics: [
    {
      id: "physics-1",
      subject: "Physics",
      topic: "力学",
      difficulty: "中等",
      question: "一个质量为2kg的物体在水平面上受到5N的恒定力作用。如果物体从静止开始运动，忽略摩擦力，10秒后物体的速度是多少？",
      options: [],
      answer: "25 m/s",
      solution: "使用牛顿第二定律：F = ma\n加速度 a = F/m = 5N / 2kg = 2.5 m/s²\n速度 v = v₀ + at = 0 + 2.5 × 10 = 25 m/s"
    },
    {
      id: "physics-2",
      subject: "Physics",
      topic: "电学",
      difficulty: "困难",
      question: "在一个电路中，三个电阻R₁ = 2Ω，R₂ = 4Ω和R₃ = 6Ω并联连接。如果电源电压为12V，求通过每个电阻的电流和总电流。",
      options: [],
      answer: "I₁ = 6A, I₂ = 3A, I₃ = 2A, I总 = 11A",
      solution: "并联电路中，每个电阻两端的电压相同，都是12V\nI₁ = V/R₁ = 12V/2Ω = 6A\nI₂ = V/R₂ = 12V/4Ω = 3A\nI₃ = V/R₃ = 12V/6Ω = 2A\nI总 = I₁ + I₂ + I₃ = 6A + 3A + 2A = 11A"
    },
    {
      id: "physics-3",
      subject: "Physics",
      topic: "热学",
      difficulty: "简单",
      question: "一块质量为500g的铁块从20°C加热到80°C需要多少热量？（铁的比热容为450 J/(kg·°C)）",
      options: [],
      answer: "13500 J",
      solution: "使用热量公式：Q = mc∆T\nQ = 0.5kg × 450 J/(kg·°C) × (80°C - 20°C)\nQ = 0.5 × 450 × 60 = 13500 J"
    }
  ],
  chemistry: [
    {
      id: "chemistry-1",
      subject: "Chemistry",
      topic: "化学方程式",
      difficulty: "中等",
      question: "平衡以下化学方程式：Fe + O₂ → Fe₂O₃",
      options: [],
      answer: "4Fe + 3O₂ → 2Fe₂O₃",
      solution: "首先确定每种元素的原子数：\nFe：左边1个，右边2个\nO：左边2个，右边3个\n平衡Fe：左边需要4个Fe，右边需要2个Fe₂O₃\n平衡O：左边需要3个O₂，右边需要2个Fe₂O₃\n最终平衡方程式：4Fe + 3O₂ → 2Fe₂O₃"
    },
    {
      id: "chemistry-2",
      subject: "Chemistry",
      topic: "酸碱反应",
      difficulty: "简单",
      question: "25mL的0.1M NaOH溶液完全中和需要多少毫升的0.05M H₂SO₄溶液？",
      options: [],
      answer: "25mL",
      solution: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\n根据化学计量关系，1摩尔H₂SO₄反应需要2摩尔NaOH\nNaOH的摩尔数 = 0.025L × 0.1M = 0.0025mol\n需要的H₂SO₄摩尔数 = 0.0025mol ÷ 2 = 0.00125mol\nH₂SO₄溶液体积 = 0.00125mol ÷ 0.05M = 0.025L = 25mL"
    },
    {
      id: "chemistry-3",
      subject: "Chemistry",
      topic: "有机化学",
      difficulty: "困难",
      question: "写出以下化合物的IUPAC命名：CH₃-CH₂-CH(CH₃)-CH₂-CH₃",
      options: [],
      answer: "3-甲基戊烷",
      solution: "1. 确定最长的碳链：这里最长的碳链有5个碳原子，所以主链是戊烷\n2. 确定取代基：在第3个碳原子上有一个甲基(-CH₃)取代基\n3. 根据IUPAC命名规则：3-甲基戊烷"
    }
  ],
  biology: [
    {
      id: "biology-1",
      subject: "Biology",
      topic: "细胞生物学",
      difficulty: "简单",
      question: "以下哪个细胞器负责细胞内的能量产生？",
      options: ["A. 核糖体", "B. 线粒体", "C. 高尔基体", "D. 内质网"],
      answer: "B",
      solution: "线粒体是细胞的”能量工厂”，通过细胞呼吸产生ATP，为细胞提供能量。核糖体负责蛋白质合成，高尔基体负责蛋白质修饰和分泌，内质网负责蛋白质合成和脂质代谢。"
    },
    {
      id: "biology-2",
      subject: "Biology",
      topic: "遗传学",
      difficulty: "中等",
      question: "一对正常视力的父母生了一个色盲的儿子。色盲是X染色体隐性遗传病。这对父母再生一个女儿，她是色盲的概率是多少？",
      options: [],
      answer: "0%",
      solution: "色盲基因位于X染色体上，是隐性的。\n父亲视力正常，所以他的X染色体上没有色盲基因(X)。\n母亲视力正常但生了色盲儿子，说明她是携带者(Xx)。\n女儿必须从父亲那里得到一个X染色体，这个X染色体没有色盲基因。\n所以女儿即使从母亲那里得到带有色盲基因的X染色体，也会表现为正常视力。\n因此，女儿是色盲的概率为0%。"
    },
    {
      id: "biology-3",
      subject: "Biology",
      topic: "生态学",
      difficulty: "困难",
      question: "在一个生态系统中，能量流动和物质循环有什么区别？",
      options: [],
      answer: "能量在生态系统中是单向流动的，最终以热能形式散失；而物质可以在生态系统中循环利用。",
      solution: "能量流动：\n1. 能量从太阳进入生态系统，通过食物链/食物网在不同营养级之间传递\n2. 每个营养级都有能量损失（约90%）\n3. 能量不能循环使用，最终以热能形式散失到环境中\n\n物质循环：\n1. 物质（如碳、氮、水等）可以在生物和非生物环境之间循环\n2. 分解者将有机物分解为无机物，使其可以被生产者再次利用\n3. 物质可以反复循环使用，不会丢失"
    }
  ],
  chinese: [
    {
      id: "chinese-1",
      subject: "华文",
      topic: "阅读理解",
      difficulty: "中等",
      question: "阅读下面的短文，然后回答问题：\n\n春天来了，小河里的冰融化了，河水哗哗地流着。小草从地里钻出来，嫩嫩的，绿绿的。树木抽出了新的枝条，长出了嫩叶。各种各样的花儿开放了，红的、黄的、紫的，美丽极了。小燕子从南方飞回来了，在天空中飞来飞去。小朋友们脱下了厚厚的冬装，换上了轻便的春装。\n\n问题：这段文字主要描述了什么？",
      options: ["A. 春天的景色", "B. 小河的变化", "C. 小朋友的活动", "D. 小燕子的归来"],
      answer: "A",
      solution: "这段文字描述了春天到来后的各种景象变化，包括小河解冻、小草发芽、树木抽枝、花儿开放、燕子归来以及人们换装等，全面展现了春天的特征，因此主要描述的是春天的景色。"
    },
    {
      id: "chinese-2",
      subject: "华文",
      topic: "词语运用",
      difficulty: "简单",
      question: "下列词语中，加点字的读音完全相同的一组是：",
      options: ["A. 差̲别 / 差̲错 / 差̲距", "B. 说̲明 / 说̲服 / 游说̲", "C. 分̲析 / 分̲歧 / 分̲配", "D. 会̲议 / 会̲见 / 会̲计"],
      answer: "C",
      solution: "A选项中，'差别'的'差'读chā，'差错'的'差'读chà，'差距'的'差'读chā，不完全相同，\nB选项中，'说明'和'说服'的'说'读shuō，'游说'的'说'读shuì，不完全相同，\nC选项中，'分析'、'分歧'和'分配'的'分'都读fēn，完全相同，\nD选项中，'会议'和'会见'的'会'读huì，'会计'的'会'读kuài，不完全相同，\n因此，C选项正确。"
    },
    {
      id: "chinese-3",
      subject: "华文",
      topic: "作文",
      difficulty: "困难",
      question: "以'成长的烦恼'为题，写一篇不少于600字的记叙文，描述你在成长过程中遇到的困难或烦恼，以及你是如何面对和解决的。",
      options: [],
      answer: "作文题，答案因人而异",
      solution: "写作提示：\n1. 明确中心思想：围绕'成长的烦恼'这一主题，选择一个或几个具体的烦恼或困难进行描述。\n2. 结构安排：\n   - 开头：简要介绍你所面临的烦恼或困难，吸引读者注意。\n   - 主体：详细描述烦恼的具体表现、原因，以及对你的影响。\n   - 转折：说明你如何面对这些烦恼，采取了哪些措施。\n   - 结尾：总结经历这些烦恼给你带来的成长和启示。\n3. 内容建议：\n   - 可以选择学业压力、人际关系、自我认同等常见的青少年烦恼。\n   - 使用具体事例，避免空泛的议论。\n   - 表达真实情感，展现个人成长历程。\n   - 体现积极向上的态度，展示解决问题的能力。\n4. 语言要求：\n   - 语言流畅，表达清晰。\n   - 适当运用修辞手法，增强文章感染力。\n   - 注意标点符号和语法的正确使用。"
    }
  ]
};

// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { spmQuestions };
}