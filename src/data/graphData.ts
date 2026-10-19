export type GraphTypeKey = 
  | 'pie-chart' 
  | 'time-series' 
  | 'histogram' 
  | 'stem-and-leaf' 
  | 'compound-bar';

export interface GraphTypeInfo {
  id: GraphTypeKey;
  name: string;
  shortName: string;
  tagline: string;
  primaryColor: string; // Tailwind color token or hex
  accentBg: string;
  borderClass: string;
  textClass: string;
  badgeBg: string;
  dataType: string;
  mainPurpose: string;
  goldenRule: string;
  gapsRule: string;
  keyFeature: string;
  commonPitfall: string;
  anatomy: {
    label: string;
    description: string;
  }[];
}

export interface ScenarioCard {
  id: string;
  title: string;
  category: 'School' | 'Health' | 'Sports' | 'Business' | 'Environment' | 'Daily Life' | 'Science';
  scenario: string;
  scenarioSimple: string; // simple English breakdown
  dataSnippet: {
    headers: string[];
    rows: (string | number)[][];
    notes?: string;
  };
  correctGraph: GraphTypeKey;
  whyRule: string;
  keywordClues: string[];
  pitfallWarning: string;
  indonesianSummary: string; // helpful translation for Indonesian learners
  sampleChartData: any;
}

export const GRAPH_TYPES: Record<GraphTypeKey, GraphTypeInfo> = {
  'pie-chart': {
    id: 'pie-chart',
    name: 'Pie Chart',
    shortName: 'Pie Chart',
    tagline: 'Proportions & percentages of a single whole',
    primaryColor: '#F43F5E', // Rose 500
    accentBg: 'bg-rose-500/10',
    borderClass: 'border-rose-500/30',
    textClass: 'text-rose-400',
    badgeBg: 'bg-rose-950/60 text-rose-300 border-rose-500/40',
    dataType: 'Categorical / Discrete (parts of 100%)',
    mainPurpose: 'Shows how a single total quantity is divided into proportions or percentages.',
    goldenRule: 'Use when showing parts of a single whole where all categories add up to 100% (or 360° of a circle).',
    gapsRule: 'Circular slices radiating from the center. Slices must not overlap.',
    keyFeature: 'Best for 3 to 6 distinct categories. Angle of slice = (Frequency ÷ Total) × 360°.',
    commonPitfall: 'Do NOT use when data represents changes over time, or when categories do not add up to a fixed 100% total.',
    anatomy: [
      { label: 'Total Circle', description: 'Represents 100% or the entire sample size (360°).' },
      { label: 'Sector / Slice', description: 'Size corresponds proportionally to category frequency.' },
      { label: 'Category Legend', description: 'Labels and percentages clearly distinguishing each sector.' },
    ],
  },
  'time-series': {
    id: 'time-series',
    name: 'Time Series Graph',
    shortName: 'Time Series',
    tagline: 'Continuous trend line over chronological time',
    primaryColor: '#06B6D4', // Cyan 500
    accentBg: 'bg-cyan-500/10',
    borderClass: 'border-cyan-500/30',
    textClass: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40',
    dataType: 'Continuous or regular interval tracking over Time',
    mainPurpose: 'Shows trends, patterns, fluctuations, peaks, and troughs over successive intervals of time.',
    goldenRule: 'Use whenever data is recorded chronologically over time (hours, days, months, years) on the horizontal axis.',
    gapsRule: 'Continuous connected line joining chronological points across continuous time.',
    keyFeature: 'Time ALWAYS sits on the horizontal (x) axis. Points are joined with straight or smooth line segments.',
    commonPitfall: 'Do NOT use for unconnected categories (e.g. favorite colors). Line graphs imply continuity between consecutive readings.',
    anatomy: [
      { label: 'Horizontal Axis (X)', description: 'Uniform time units (e.g. 08:00, 10:00, 12:00 or Jan, Feb, Mar).' },
      { label: 'Vertical Axis (Y)', description: 'Measured numerical variable (e.g. Temperature in °C, Stock price in $).' },
      { label: 'Trend Line', description: 'Visual line connecting consecutive points to reveal upward or downward momentum.' },
    ],
  },
  'histogram': {
    id: 'histogram',
    name: 'Frequency Diagram / Histogram',
    shortName: 'Histogram',
    tagline: 'Continuous numerical data grouped in intervals (no gaps)',
    primaryColor: '#10B981', // Emerald 500
    accentBg: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
    textClass: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
    dataType: 'Continuous numerical grouped into class intervals',
    mainPurpose: 'Shows frequency distribution and spread across continuous measurement ranges (e.g. 10 ≤ t < 20).',
    goldenRule: 'Use for continuous data measured on a continuous scale and grouped into class intervals. Bars MUST touch (no gaps).',
    gapsRule: 'NO GAPS between bars because continuous variables have no gaps in real life.',
    keyFeature: 'Horizontal axis is a continuous continuous number line (e.g. height, weight, time), not isolated named labels.',
    commonPitfall: 'Never leave gaps between bars! If bars have gaps between them, it is a discrete bar chart, NOT a histogram.',
    anatomy: [
      { label: 'Contiguous Bars', description: 'Bars touch side-by-side with zero space between them.' },
      { label: 'Class Intervals', description: 'Grouped intervals on continuous scale (e.g., 0–10, 10–20, 20–30).' },
      { label: 'Frequency Axis (Y)', description: 'Height represents the count of occurrences in that interval.' },
    ],
  },
  'stem-and-leaf': {
    id: 'stem-and-leaf',
    name: 'Stem-and-Leaf Diagram',
    shortName: 'Stem-and-Leaf',
    tagline: 'Preserves every raw data value while showing shape',
    primaryColor: '#8B5CF6', // Violet 500
    accentBg: 'bg-violet-500/10',
    borderClass: 'border-violet-500/30',
    textClass: 'text-violet-400',
    badgeBg: 'bg-violet-950/60 text-violet-300 border-violet-500/40',
    dataType: 'Raw numerical data (discrete or continuous measurements)',
    mainPurpose: 'Organizes raw numbers in ascending order so you can see distribution shape without losing original individual values.',
    goldenRule: 'Use when you must preserve all exact original data values (e.g. exam marks) and need to calculate median, mode, or range easily.',
    gapsRule: 'Organized into a central vertical spine (Stem) and aligned single digits (Leaves).',
    keyFeature: 'MUST always include an explanatory Key (e.g., "Key: 4 | 7 = 47 marks"). Leaves are strictly ordered single digits.',
    commonPitfall: 'Forgetting the Key loses marks in exams. Leaves must be equally spaced single digits in ascending numerical order.',
    anatomy: [
      { label: 'Stem (Tens/Leading)', description: 'Common leading digits listed vertically in order.' },
      { label: 'Leaves (Units)', description: 'Last single digits written horizontally in ascending order.' },
      { label: 'Mandatory Key', description: 'Explains scale (e.g., 5 | 2 means 52 or 5.2).' },
    ],
  },
  'compound-bar': {
    id: 'compound-bar',
    name: 'Compound Bar Chart',
    shortName: 'Compound Bar Chart',
    tagline: 'Comparing multiple sub-groups across discrete categories',
    primaryColor: '#F59E0B', // Amber 500
    accentBg: 'bg-amber-500/10',
    borderClass: 'border-amber-500/30',
    textClass: 'text-amber-400',
    badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
    dataType: 'Categorical / Discrete with two or more comparative sub-groups',
    mainPurpose: 'Compares two or more distinct sub-series side-by-side or stacked within each discrete category.',
    goldenRule: 'Use to compare two or more groups (e.g., Boys vs Girls, Year 1 vs Year 2, Product A vs B) across distinct categories.',
    gapsRule: 'Bars within the same category group touch or are stacked, but clear gaps separate different categories.',
    keyFeature: 'Requires a clear color legend to differentiate the comparative sub-groups.',
    commonPitfall: 'Do NOT confuse with a single bar chart or histogram. Compound bar charts always compare multiple sub-groups per category.',
    anatomy: [
      { label: 'Grouped / Dual Bars', description: 'Side-by-side or stacked bars representing different sub-groups.' },
      { label: 'Category Clusters', description: 'Distinct categories separated by clear gaps.' },
      { label: 'Legend / Key', description: 'Color-coded indicator for each sub-group (e.g. Blue = 2025, Orange = 2026).' },
    ],
  },
};

export const SCENARIO_CARDS: ScenarioCard[] = [
  {
    id: 'scen-01',
    title: 'Hospital Patient Temperature Log',
    category: 'Health',
    scenario: 'A hospital nurse records a patient\'s body temperature in degrees Celsius every 2 hours following surgery to see if a fever is rising or falling over a 24-hour period.',
    scenarioSimple: 'Recording temperature repeatedly across time to spot rising or falling fever trends.',
    dataSnippet: {
      headers: ['Time', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
      rows: [
        ['Temp (°C)', '37.1', '37.4', '38.2', '38.9', '38.5', '37.8', '37.2'],
      ],
      notes: 'Monitored continuously every 2 hours over 24 hours.'
    },
    correctGraph: 'time-series',
    whyRule: 'Time Series Graph is required because the data is tracked chronologically over continuous time (hours of the day) to identify trends, peaks, and recoveries.',
    keywordClues: ['every 2 hours', 'rising or falling trend', 'over a 24-hour period'],
    pitfallWarning: 'Why not a Bar Chart? A bar chart treats each hour as a disconnected isolated bucket, losing the fluid visual sense of continuous temperature change.',
    indonesianSummary: 'Gunakan Time Series karena data dicatat berurutan terhadap waktu (setiap 2 jam) untuk melihat tren naik-turunnya demam.',
    sampleChartData: {
      labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
      values: [37.1, 37.4, 38.2, 38.9, 38.5, 37.8, 37.2],
      unit: '°C'
    }
  },
  {
    id: 'scen-02',
    title: 'Bakery Daily Revenue Breakdown',
    category: 'Business',
    scenario: 'A local bakery wants to illustrate what percentage of its total daily revenue came from its 4 product lines: Sourdough Bread, Croissants, Birthday Cakes, and Coffee.',
    scenarioSimple: 'Showing what fraction/share of the 100% total revenue belongs to each product line.',
    dataSnippet: {
      headers: ['Item Category', 'Daily Revenue ($)', 'Percentage of Total'],
      rows: [
        ['Sourdough Bread', '$450', '30%'],
        ['Croissants', '$300', '20%'],
        ['Birthday Cakes', '$600', '40%'],
        ['Coffee & Drinks', '$150', '10%'],
      ],
      notes: 'Total Revenue = $1,500 (100% total whole)'
    },
    correctGraph: 'pie-chart',
    whyRule: 'Pie Chart is ideal because we are displaying proportions and percentages of a single, complete total whole (100% of revenue) across a small number of categories.',
    keywordClues: ['percentage of total revenue', 'shares of a single total', '4 distinct product lines'],
    pitfallWarning: 'Why not a Line Graph? There is no time sequence here! The categories are non-chronological parts of a single sum.',
    indonesianSummary: 'Gunakan Pie Chart karena membagi satu total penjualan (100%) menjadi porsi atau persentase beberapa kategori.',
    sampleChartData: {
      slices: [
        { label: 'Sourdough Bread', value: 30, color: '#FB7185' },
        { label: 'Croissants', value: 20, color: '#FBBF24' },
        { label: 'Birthday Cakes', value: 40, color: '#F43F5E' },
        { label: 'Coffee & Drinks', value: 10, color: '#2DD4BF' },
      ]
    }
  },
  {
    id: 'scen-03',
    title: 'Athletics Sprint Times Distribution',
    category: 'Sports',
    scenario: 'A physical education teacher measures the 100-meter sprint finish times (in seconds) of 80 students and groups them into intervals: 12.0 ≤ t < 13.0, 13.0 ≤ t < 14.0, 14.0 ≤ t < 15.0, etc., to see the shape of the speed distribution.',
    scenarioSimple: 'Grouping continuous numerical time measurements into equal intervals with no gaps.',
    dataSnippet: {
      headers: ['Time Interval (s)', '12 ≤ t < 13', '13 ≤ t < 14', '14 ≤ t < 15', '15 ≤ t < 16', '16 ≤ t < 17'],
      rows: [
        ['Number of Students', '6', '18', '32', '16', '8'],
      ],
      notes: 'Continuous measurement grouped into 1-second class intervals.'
    },
    correctGraph: 'histogram',
    whyRule: 'Frequency Diagram / Histogram is required because sprint time is continuous numerical data grouped into equal class intervals, and bars must touch with NO gaps.',
    keywordClues: ['continuous finish times in seconds', 'grouped into intervals', 'bars must touch with no gaps'],
    pitfallWarning: 'Why not a standard Bar Chart? Standard bar charts have gaps between bars for separated discrete categories. Sprint times are continuous numbers, so bars must touch.',
    indonesianSummary: 'Gunakan Histogram / Diagram Frekuensi karena data waktu lari bersifat kontinu dan dikelompokkan dalam interval kelas (batang saling menempel tanpa celah).',
    sampleChartData: {
      bins: ['12–13s', '13–14s', '14–15s', '15–16s', '16–17s'],
      counts: [6, 18, 32, 16, 8]
    }
  },
  {
    id: 'scen-04',
    title: 'Individual Maths Exam Marks Audit',
    category: 'School',
    scenario: 'A maths teacher wants to display the test scores out of 100 for 28 students. She needs to see the overall shape of the class distribution and easily find the median, but parents and students must still be able to read their exact original scores.',
    scenarioSimple: 'Showing the distribution shape while keeping every single raw student score readable.',
    dataSnippet: {
      headers: ['Raw Marks Sample (n=28)'],
      rows: [
        ['42, 45, 48, 51, 54, 55, 58, 60, 62, 63, 65, 67, 68, 69, 71, 72, 74, 75, 78, 81, 83, 85, 88, 91, 92, 95, 96, 98']
      ],
      notes: 'Must preserve exact raw scores and include an explanatory Key (e.g., 5 | 1 = 51).'
    },
    correctGraph: 'stem-and-leaf',
    whyRule: 'Stem-and-Leaf Diagram is chosen because it organizes numerical data in ascending order and reveals the distribution shape while preserving every single exact raw data value.',
    keywordClues: ['read their exact original scores', 'find median and spread easily', 'requires a Key'],
    pitfallWarning: 'Why not a Histogram? A histogram loses the individual numbers (you only know how many fell between 50 and 60, not whether someone got 51 or 59).',
    indonesianSummary: 'Gunakan Stem-and-Leaf (Diagram Batang-Daun) karena mempertahankan setiap nilai asli siswa sekaligus memperlihatkan sebaran dan memudahkan mencari median.',
    sampleChartData: {
      stems: [
        { stem: 4, leaves: [2, 5, 8] },
        { stem: 5, leaves: [1, 4, 5, 8] },
        { stem: 6, leaves: [0, 2, 3, 5, 7, 8, 9] },
        { stem: 7, leaves: [1, 2, 4, 5, 8] },
        { stem: 8, leaves: [1, 3, 5, 8] },
        { stem: 9, leaves: [1, 2, 5, 6, 8] },
      ],
      key: '5 | 1 = 51 marks'
    }
  },
  {
    id: 'scen-05',
    title: 'Sports Preference: Boys vs Girls',
    category: 'Sports',
    scenario: 'A sports coordinator surveys Year 8 students to compare the favorite sports of Boys vs Girls across Football, Basketball, Tennis, Swimming, and Badminton.',
    scenarioSimple: 'Comparing two distinct sub-groups (Boys and Girls) across multiple categorical choices.',
    dataSnippet: {
      headers: ['Sport', 'Football', 'Basketball', 'Tennis', 'Swimming', 'Badminton'],
      rows: [
        ['Boys', '45', '30', '15', '20', '10'],
        ['Girls', '22', '35', '28', '34', '18'],
      ],
      notes: 'Comparing 2 sub-groups side-by-side across 5 discrete sport categories.'
    },
    correctGraph: 'compound-bar',
    whyRule: 'Compound Bar Chart (Dual / Grouped Bar Chart) is ideal because we are comparing multiple sub-groups (Boys vs Girls) side-by-side across discrete non-numerical categories.',
    keywordClues: ['compare Boys vs Girls', 'across discrete sports', 'side-by-side comparative bars with legend'],
    pitfallWarning: 'Why not a Pie Chart? A single pie chart cannot effectively compare two distinct sub-groups across multiple sports simultaneously without confusing angles.',
    indonesianSummary: 'Gunakan Compound Bar Chart karena membandingkan dua sub-kelompok (Laki-laki vs Perempuan) berdampingan untuk beberapa kategori olahraga yang berbeda.',
    sampleChartData: {
      categories: ['Football', 'Basketball', 'Tennis', 'Swimming', 'Badminton'],
      series: [
        { name: 'Boys', values: [45, 30, 15, 20, 10], color: '#38BDF8' },
        { name: 'Girls', values: [22, 35, 28, 34, 18], color: '#F472B6' },
      ]
    }
  },
  {
    id: 'scen-06',
    title: 'Monthly Rainfall Throughout The Year',
    category: 'Environment',
    scenario: 'A weather meteorologist records the average monthly rainfall (in millimeters) in a tropical region from January to December to evaluate wet and dry season patterns.',
    scenarioSimple: 'Tracking rainfall amounts chronologically over the 12 months of the year.',
    dataSnippet: {
      headers: ['Month', 'Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      rows: [
        ['Rainfall (mm)', '280', '210', '95', '35', '120', '310'],
      ],
      notes: '12 successive chronological months.'
    },
    correctGraph: 'time-series',
    whyRule: 'Time Series Graph connects measurements recorded chronologically over time (months) to showcase seasonal weather cycles and rainfall trends.',
    keywordClues: ['January to December', 'seasonal patterns over the year', 'chronological monthly intervals'],
    pitfallWarning: 'Why not a Stem-and-Leaf? Stem-and-leaf diagrams discard chronological time sequence, jumbling the months into number order instead of calendar order.',
    indonesianSummary: 'Gunakan Time Series karena data direkam berdasarkan urutan bulan dalam setahun untuk melihat pola musim hujan dan kemarau.',
    sampleChartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values: [280, 260, 210, 150, 95, 45, 35, 50, 120, 190, 310, 330],
      unit: 'mm'
    }
  },
  {
    id: 'scen-07',
    title: 'Household Monthly Budget Allocation',
    category: 'Daily Life',
    scenario: 'A family tracks how their monthly income of $4,000 is divided between Rent, Food, Utilities, Transport, and Savings to verify what proportion goes into rent.',
    scenarioSimple: 'Showing the percentage share of a fixed monthly income allocated to expense categories.',
    dataSnippet: {
      headers: ['Expense Category', 'Amount ($)', 'Percentage of Budget'],
      rows: [
        ['Housing / Rent', '$1,600', '40%'],
        ['Groceries & Food', '$1,000', '25%'],
        ['Utilities & Bills', '$400', '10%'],
        ['Transportation', '$400', '10%'],
        ['Emergency Savings', '$600', '15%'],
      ],
      notes: 'Total Budget = $4,000 (100% of income)'
    },
    correctGraph: 'pie-chart',
    whyRule: 'Pie Chart is best because the family wants to compare the relative proportions or percentage slices of their total 100% monthly budget.',
    keywordClues: ['divided between expenses', 'what proportion of total budget', 'adds up to 100%'],
    pitfallWarning: 'Why not a Time Series? This data reflects one single total budget snapshot, not changes recorded at sequential timestamps.',
    indonesianSummary: 'Gunakan Pie Chart karena membagi seluruh pendapatan (100%) ke dalam porsi pengeluaran.',
    sampleChartData: {
      slices: [
        { label: 'Housing/Rent', value: 40, color: '#F43F5E' },
        { label: 'Groceries/Food', value: 25, color: '#FB923C' },
        { label: 'Savings', value: 15, color: '#34D399' },
        { label: 'Utilities', value: 10, color: '#38BDF8' },
        { label: 'Transportation', value: 10, color: '#A78BFA' },
      ]
    }
  },
  {
    id: 'scen-08',
    title: 'Plant Heights in a Biology Experiment',
    category: 'Science',
    scenario: 'A biology student measures the exact height (in centimeters) of 120 bean plants grown under identical light. Heights range from 15.2 cm to 44.8 cm, and the student groups them into 5-centimeter intervals (15 ≤ h < 20, 20 ≤ h < 25, etc.).',
    scenarioSimple: 'Grouping continuous biological height measurements into equal continuous intervals.',
    dataSnippet: {
      headers: ['Height (cm)', '15 ≤ h < 20', '20 ≤ h < 25', '25 ≤ h < 30', '30 ≤ h < 35', '35 ≤ h < 40', '40 ≤ h < 45'],
      rows: [
        ['Plant Count', '8', '24', '42', '28', '14', '4'],
      ],
      notes: 'Continuous biological measurement grouped into 5cm class bins.'
    },
    correctGraph: 'histogram',
    whyRule: 'Histogram / Frequency Diagram is required because plant height is a continuous physical measurement grouped into continuous class intervals; bars must be contiguous with no gaps.',
    keywordClues: ['continuous height in cm', 'grouped into 5cm intervals', 'continuous number scale'],
    pitfallWarning: 'Why not a Bar Chart? In a bar chart, categories are discrete with gaps. Plant height is continuous, so the bars must touch.',
    indonesianSummary: 'Gunakan Histogram karena tinggi tanaman merupakan data kontinu yang dikelompokkan ke dalam interval (batang menempel rapat tanpa jeda).',
    sampleChartData: {
      bins: ['15–20cm', '20–25cm', '25–30cm', '30–35cm', '35–40cm', '40–45cm'],
      counts: [8, 24, 42, 28, 14, 4]
    }
  },
  {
    id: 'scen-09',
    title: 'Customer Waiting Times at a Bank Counter',
    category: 'Business',
    scenario: 'A bank manager records the waiting times in minutes of 35 customers on Monday morning: 12, 14, 18, 21, 22, 25, 29, 31, 33, 34, 38, etc. The manager wants to calculate the exact median wait time and interquartile range while inspecting the distribution.',
    scenarioSimple: 'Finding exact median and quartiles while retaining every customer\'s exact wait time.',
    dataSnippet: {
      headers: ['Customer Wait Times in Minutes (n=35)'],
      rows: [
        ['12, 14, 15, 18, 19, 21, 22, 23, 25, 27, 28, 29, 30, 31, 32, 34, 34, 37, 39, 41, 42, 45, 46, 48, 52, 55']
      ],
      notes: 'Must preserve individual raw minutes to calculate exact median.'
    },
    correctGraph: 'stem-and-leaf',
    whyRule: 'Stem-and-Leaf Diagram is chosen because preserving every single raw value allows the manager to count in to find the exact median customer and see the data distribution.',
    keywordClues: ['calculate the exact median wait time', 'retain every raw customer time', 'includes a key (e.g. 2 | 5 = 25 min)'],
    pitfallWarning: 'Why not a Histogram? A histogram would lump 21 and 29 into one "20–30" bar, permanently hiding the exact minutes needed for finding the median.',
    indonesianSummary: 'Gunakan Stem-and-Leaf karena setiap data waktu tunggu harus tetap terbaca untuk menghitung nilai median dan kuartil secara tepat.',
    sampleChartData: {
      stems: [
        { stem: 1, leaves: [2, 4, 5, 8, 9] },
        { stem: 2, leaves: [1, 2, 3, 5, 7, 8, 9] },
        { stem: 3, leaves: [0, 1, 2, 4, 4, 7, 9] },
        { stem: 4, leaves: [1, 2, 5, 6, 8] },
        { stem: 5, leaves: [2, 5] },
      ],
      key: '2 | 5 = 25 minutes'
    }
  },
  {
    id: 'scen-10',
    title: 'Store Sales: Year 2024 vs Year 2025',
    category: 'Business',
    scenario: 'A retail chain wants to compare sales figures (in thousands of dollars) across 4 city branches (Downtown, Northside, Eastgate, West End) for both 2024 and 2025 on the same chart.',
    scenarioSimple: 'Comparing two different years side-by-side across 4 distinct store locations.',
    dataSnippet: {
      headers: ['Branch', 'Downtown', 'Northside', 'Eastgate', 'West End'],
      rows: [
        ['2024 ($k)', '320', '210', '180', '260'],
        ['2025 ($k)', '380', '240', '195', '310'],
      ],
      notes: 'Comparing 2024 vs 2025 side-by-side per branch.'
    },
    correctGraph: 'compound-bar',
    whyRule: 'Compound Bar Chart (Dual Bar Chart) allows side-by-side comparison of two distinct sub-groups (Year 2024 vs Year 2025) for each discrete category (branch).',
    keywordClues: ['compare 2024 and 2025', 'across 4 branches', 'dual bars with a legend'],
    pitfallWarning: 'Why not a Pie Chart? A pie chart cannot compare two different years across four branches simultaneously with clarity.',
    indonesianSummary: 'Gunakan Compound Bar Chart karena membandingkan dua tahun (2024 vs 2025) berdampingan untuk 4 cabang toko berbeda.',
    sampleChartData: {
      categories: ['Downtown', 'Northside', 'Eastgate', 'West End'],
      series: [
        { name: '2024', values: [320, 210, 180, 260], color: '#64748B' },
        { name: '2025', values: [380, 240, 195, 310], color: '#F59E0B' },
      ]
    }
  },
  {
    id: 'scen-11',
    title: 'Heart Rate During a 30-Minute Treadmill Run',
    category: 'Health',
    scenario: 'A fitness tracker continuously monitors an athlete\'s pulse in beats per minute (BPM) at 5-minute intervals from the warm-up to cool-down to observe cardiovascular response.',
    scenarioSimple: 'Tracking changing heart rate values measured at consecutive time intervals.',
    dataSnippet: {
      headers: ['Minute', '0 min', '5 min', '10 min', '15 min', '20 min', '25 min', '30 min'],
      rows: [
        ['Heart Rate (BPM)', '72', '115', '142', '165', '168', '150', '95'],
      ],
      notes: 'Recorded at 5-minute time marks throughout exercise.'
    },
    correctGraph: 'time-series',
    whyRule: 'Time Series Graph connects chronological measurements over the course of time (minutes) to show the rise, peak, and recovery curve of heart rate.',
    keywordClues: ['at 5-minute intervals', 'over 30-minute workout', 'observe trend/curve'],
    pitfallWarning: 'Why not a Stem-and-Leaf? That would erase the minute-by-minute order of the workout, making it impossible to see when the peak occurred.',
    indonesianSummary: 'Gunakan Time Series karena denyut jantung diukur berkala dari waktu ke waktu (setiap 5 menit) untuk melihat kurva kenaikan dan pemulihan.',
    sampleChartData: {
      labels: ['0m', '5m', '10m', '15m', '20m', '25m', '30m'],
      values: [72, 115, 142, 165, 168, 150, 95],
      unit: 'BPM'
    }
  },
  {
    id: 'scen-12',
    title: 'Atmospheric Gas Composition',
    category: 'Science',
    scenario: 'A science textbook presents the chemical composition of clean dry air near sea level: 78% Nitrogen, 21% Oxygen, 0.93% Argon, and 0.04% Carbon Dioxide.',
    scenarioSimple: 'Showing what percentage share of the Earth\'s total atmosphere is made of each gas.',
    dataSnippet: {
      headers: ['Gas Component', 'Chemical Formula', 'Percentage of Atmosphere'],
      rows: [
        ['Nitrogen', 'N₂', '78.08%'],
        ['Oxygen', 'O₂', '20.95%'],
        ['Argon', 'Ar', '0.93%'],
        ['Other Trace Gases', 'CO₂, Ne, He', '0.04%'],
      ],
      notes: 'Adds up to exactly 100% of Earth\'s atmosphere.'
    },
    correctGraph: 'pie-chart',
    whyRule: 'Pie Chart is the textbook graph to display fixed percentages of a single 100% whole, showing how Nitrogen dominates the entire circular disk.',
    keywordClues: ['percentage of total air', 'adds up to 100%', 'proportions of a whole'],
    pitfallWarning: 'Why not a Histogram? Gases are distinct chemical names (categorical/discrete), not grouped ranges on a continuous numerical scale.',
    indonesianSummary: 'Gunakan Pie Chart karena menampilkan komposisi persentase dari satu kesatuan atmosfer bumi (100%).',
    sampleChartData: {
      slices: [
        { label: 'Nitrogen (78%)', value: 78.1, color: '#0284C7' },
        { label: 'Oxygen (21%)', value: 20.9, color: '#38BDF8' },
        { label: 'Argon (1%)', value: 0.9, color: '#F43F5E' },
        { label: 'Trace gases (<0.1%)', value: 0.1, color: '#FBBF24' },
      ]
    }
  },
  {
    id: 'scen-13',
    title: 'Commute Distances of 150 Factory Workers',
    category: 'Daily Life',
    scenario: 'A company surveys the distance in kilometers that 150 employees travel to work each morning. Distances are continuous numbers grouped into: 0 ≤ d < 5 km, 5 ≤ d < 10 km, 10 ≤ d < 15 km, 15 ≤ d < 20 km, and 20 ≤ d < 25 km.',
    scenarioSimple: 'Continuous distance measurements grouped into continuous interval ranges without gaps.',
    dataSnippet: {
      headers: ['Distance (km)', '0 ≤ d < 5', '5 ≤ d < 10', '10 ≤ d < 15', '15 ≤ d < 20', '20 ≤ d < 25'],
      rows: [
        ['Workers Frequency', '25', '55', '40', '20', '10'],
      ],
      notes: 'Continuous measurement grouped into 5 km bins.'
    },
    correctGraph: 'histogram',
    whyRule: 'Histogram / Frequency Diagram is required because distance is continuous numerical data grouped into equal class intervals, plotted with contiguous touching bars.',
    keywordClues: ['distance in km', 'grouped into class intervals', 'bars touch with no gaps'],
    pitfallWarning: 'Why not a Compound Bar Chart? There is only one single group of workers being counted across intervals, not multiple sub-series like men vs women.',
    indonesianSummary: 'Gunakan Histogram karena jarak tempuh merupakan nilai kontinu yang dibagi menjadi interval kelas berurutan (tanpa jeda antarkolom).',
    sampleChartData: {
      bins: ['0–5km', '5–10km', '10–15km', '15–20km', '20–25km'],
      counts: [25, 55, 40, 20, 10]
    }
  },
  {
    id: 'scen-14',
    title: 'Exam Score Back-to-Back Comparison',
    category: 'School',
    scenario: 'A teacher records 25 physics test scores (values between 30 and 99). The teacher wants to organize every exact test score into ascending order to quickly read off the maximum, minimum, and median score for the report card.',
    scenarioSimple: 'Retaining every single raw exam score in ascending order with a key.',
    dataSnippet: {
      headers: ['Physics Raw Scores (n=25)'],
      rows: [
        ['34, 38, 41, 44, 49, 52, 55, 58, 60, 61, 63, 67, 70, 72, 73, 76, 79, 81, 84, 85, 89, 90, 92, 94, 98']
      ],
      notes: 'Every score is preserved, ordered by stem.'
    },
    correctGraph: 'stem-and-leaf',
    whyRule: 'Stem-and-Leaf Diagram preserves every exact score, orders them systematically, and makes finding the median (the 13th score = 70) and range trivial.',
    keywordClues: ['organize every exact test score', 'read off maximum, minimum, and median', 'key: 4 | 1 = 41'],
    pitfallWarning: 'Why not a Pie Chart? A pie chart cannot sort numbers in ascending order or help calculate the exact median value.',
    indonesianSummary: 'Gunakan Stem-and-Leaf karena nilai ujian mentah setiap murid tetap tersimpan dan terurut sehingga median dan nilai ekstrem mudah ditentukan.',
    sampleChartData: {
      stems: [
        { stem: 3, leaves: [4, 8] },
        { stem: 4, leaves: [1, 4, 9] },
        { stem: 5, leaves: [2, 5, 8] },
        { stem: 6, leaves: [0, 1, 3, 7] },
        { stem: 7, leaves: [0, 2, 3, 6, 7, 9] },
        { stem: 8, leaves: [1, 4, 5, 9] },
        { stem: 9, leaves: [0, 2, 4, 8] },
      ],
      key: '7 | 0 = 70 marks'
    }
  },
  {
    id: 'scen-15',
    title: 'Lunch Choices: Grade 7 vs Grade 8',
    category: 'School',
    scenario: 'A school cafeteria records the lunch orders of Grade 7 vs Grade 8 students across 4 menu items: Pasta, Chicken Rice, Veggie Burger, and Pizza to compare their eating preferences side-by-side.',
    scenarioSimple: 'Comparing two distinct grades (sub-groups) across discrete food options.',
    dataSnippet: {
      headers: ['Meal Option', 'Pasta', 'Chicken Rice', 'Veggie Burger', 'Pizza'],
      rows: [
        ['Grade 7', '65', '80', '25', '110'],
        ['Grade 8', '50', '95', '40', '130'],
      ],
      notes: 'Comparing Grade 7 vs Grade 8 across 4 discrete lunch options.'
    },
    correctGraph: 'compound-bar',
    whyRule: 'Compound Bar Chart (Dual Bar Chart) allows the cafeteria manager to compare lunch orders between the two student grades side-by-side for each meal item.',
    keywordClues: ['Grade 7 vs Grade 8', 'across 4 menu items', 'side-by-side comparative bars'],
    pitfallWarning: 'Why not a Time Series? Meal options are discrete categorical food choices, not successive moments in time.',
    indonesianSummary: 'Gunakan Compound Bar Chart karena membandingkan dua kelompok siswa (Kelas 7 vs Kelas 8) berdampingan untuk menu makan siang yang sama.',
    sampleChartData: {
      categories: ['Pasta', 'Chicken Rice', 'Veggie Burger', 'Pizza'],
      series: [
        { name: 'Grade 7', values: [65, 80, 25, 110], color: '#6366F1' },
        { name: 'Grade 8', values: [50, 95, 40, 130], color: '#F59E0B' },
      ]
    }
  }
];

export interface DecisionStep {
  id: string;
  question: string;
  indonesianQuestion?: string;
  description: string;
  options: {
    label: string;
    description: string;
    nextStepId?: string;
    resultGraph?: GraphTypeKey;
    whyRule?: string;
  }[];
}

export const DECISION_TREE: Record<string, DecisionStep> = {
  start: {
    id: 'start',
    question: 'What is the primary nature of your data or measurement?',
    indonesianQuestion: 'Apa karakteristik utama dari data atau pengukuran Anda?',
    description: 'First, examine whether your data involves time, categories, continuous measurements, or individual raw values.',
    options: [
      {
        label: 'Collected chronologically over time',
        description: 'e.g. Temperature every 2h, stock prices over months, rainfall per month.',
        resultGraph: 'time-series',
        whyRule: 'Data recorded chronologically across regular time intervals belongs on a Time Series Graph with time on the horizontal axis.'
      },
      {
        label: 'Parts or proportions of a single 100% total',
        description: 'e.g. Budget breakdown, market shares, composition of clean air.',
        resultGraph: 'pie-chart',
        whyRule: 'When you are showing how a fixed single total (100% / 360°) is divided among non-overlapping categories, use a Pie Chart.'
      },
      {
        label: 'Categorical items comparing two or more sub-groups',
        description: 'e.g. Boys vs Girls sports, 2024 vs 2025 branch sales, Grade 7 vs 8 lunch orders.',
        resultGraph: 'compound-bar',
        whyRule: 'Comparing multiple related series or sub-groups side-by-side across discrete categories requires a Compound (Dual) Bar Chart.'
      },
      {
        label: 'Continuous measurements grouped into intervals / bins',
        description: 'e.g. Heights, weights, finish times, grouped into 10–20, 20–30 ranges.',
        resultGraph: 'histogram',
        whyRule: 'Continuous data grouped into intervals requires a Histogram (Frequency Diagram). The bars must touch with zero gaps.'
      },
      {
        label: 'Numerical scores where every raw value must stay readable',
        description: 'e.g. 28 exam marks where students need their exact score and you need to find the median.',
        resultGraph: 'stem-and-leaf',
        whyRule: 'To retain every single raw number in ascending order while displaying the spread and calculating median/mode, use a Stem-and-Leaf diagram with a Key.'
      }
    ]
  }
};
