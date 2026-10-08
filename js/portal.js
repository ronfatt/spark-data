/**
 * SPARK UNION CAPITAL - Portal 3.0 Interactive Engine
 * Pro Real-Time Market Terminal + Full Interactive Resource Library (sparkai.cc Architecture)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Clean URL hash if visitor landed with legacy slide hash or hero hash
  if (window.location.hash.startsWith('#slide-') || window.location.hash === '#hero') {
    try {
      history.replaceState(null, null, window.location.pathname + window.location.search + '#home');
    } catch (_) {}
  }
  // =========================================================================
  // 1. ASSET DATA REGISTRY & REAL-TIME MARKET ENGINE
  // =========================================================================

  const ASSETS = {
    crypto: {
      categoryName: '数字货币',
      instruments: {
        'BTC': {
          symbol: 'BTC / USD',
          name: '比特币 (Bitcoin)',
          sub: '全球市值第一数字资产 · 宏观流动性锚定物',
          basePrice: 68420.50,
          currentPrice: 68420.50,
          change24h: 3.42,
          high24h: 69280.00,
          low24h: 66810.00,
          volume24h: '38.45B',
          spread: '0.50',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 68,
            neutral: 22,
            bearish: 10,
            titanScore: 89.4,
            orionScore: 0.28,
            liquidity: 95.2,
            iv: 36.4,
            summary: 'BTC 处于多头突破结构中。链上大额非流动性持仓持续走高，巨鲸积累阶段显著。当前短期均线带（MA7/MA25）维持黄金交叉形态，上方强阻力位测试 70,000 美元整数关口。'
          }
        },
        'ETH': {
          symbol: 'ETH / USD',
          name: '以太坊 (Ethereum)',
          sub: '全球去中心化计算网络 · 智能合约生态结算层',
          basePrice: 3540.20,
          currentPrice: 3540.20,
          change24h: 2.18,
          high24h: 3610.50,
          low24h: 3460.00,
          volume24h: '19.82B',
          spread: '0.10',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 62,
            neutral: 26,
            bearish: 12,
            titanScore: 84.1,
            orionScore: 0.32,
            liquidity: 91.5,
            iv: 41.2,
            summary: '以太坊 Layer-2 结算活跃度回升，质押率稳定在 28% 以上。模型监测到质押流入加速，若 BTC 突破阻力位，ETH 具备高弹性轮动修复动能。'
          }
        },
        'SOL': {
          symbol: 'SOL / USD',
          name: '索拉纳 (Solana)',
          sub: '高性能并行公链 · 高频微支付与 DeFi 基础设施',
          basePrice: 182.60,
          currentPrice: 182.60,
          change24h: 6.75,
          high24h: 188.40,
          low24h: 171.20,
          volume24h: '8.34B',
          spread: '0.05',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 74,
            neutral: 18,
            bearish: 8,
            titanScore: 92.6,
            orionScore: 0.35,
            liquidity: 88.0,
            iv: 52.8,
            summary: 'SOL 高频链上活跃地址持续创年内新高，DeFi TVL 强劲增长。量化动量因子处于第一象限强进攻区间，建议设置追踪动态止盈。'
          }
        },
        'BNB': {
          symbol: 'BNB / USD',
          name: '币安币 (BNB)',
          sub: '全球头部加密资产交易生态基础设施燃料代币',
          basePrice: 590.10,
          currentPrice: 590.10,
          change24h: -0.45,
          high24h: 598.00,
          low24h: 586.30,
          volume24h: '2.15B',
          spread: '0.10',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 55,
            neutral: 35,
            bearish: 10,
            titanScore: 78.5,
            orionScore: 0.22,
            liquidity: 89.2,
            iv: 28.5,
            summary: 'BNB 处于箱体中轴整理期，持有者集中度高且季度销毁机制提供坚实下行缓冲，属于防御型高 Sharpe 比率配置标的。'
          }
        }
      }
    },
    futures: {
      categoryName: '大宗期货与黄金',
      instruments: {
        'GC': {
          symbol: 'XAU / USD (COMEX 黄金)',
          name: '国际现货黄金 (Gold Spot)',
          sub: '全球终极无信用风险主权避险资产 · 抗通胀压舱石',
          basePrice: 2685.40,
          currentPrice: 2685.40,
          change24h: 1.12,
          high24h: 2692.80,
          low24h: 2664.20,
          volume24h: '42.10B',
          spread: '0.20',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 75,
            neutral: 20,
            bearish: 5,
            titanScore: 93.8,
            orionScore: 0.15,
            liquidity: 99.1,
            iv: 18.2,
            summary: '全球央行净购金趋势强劲，地缘政治避险溢价常态化。SPARK AI 黄金量化模型显示跨周期多空对冲策略在 2,650 美元上方具备极高安全边际。'
          }
        },
        'CL': {
          symbol: 'WTI 原油 (CL / USD)',
          name: '美原油连续 (Crude Oil)',
          sub: '全球大宗工业血液 · 能源通胀敏感先行指标',
          basePrice: 74.80,
          currentPrice: 74.80,
          change24h: -1.25,
          high24h: 76.20,
          low24h: 74.10,
          volume24h: '18.90B',
          spread: '0.02',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 42,
            neutral: 40,
            bearish: 18,
            titanScore: 68.2,
            orionScore: 0.45,
            liquidity: 96.0,
            iv: 34.5,
            summary: 'OPEC+ 供应政策与全球制造业补库周期拉锯，波动率处于适中区间，建议采用网格期现套利与波动率跨式策略。'
          }
        },
        'ES': {
          symbol: '标普500期货 (ES / USD)',
          name: 'E-mini S&P 500',
          sub: '美股基准核心宽基指数期货 · 全球股权风险晴雨表',
          basePrice: 5880.25,
          currentPrice: 5880.25,
          change24h: 0.68,
          high24h: 5895.50,
          low24h: 5845.00,
          volume24h: '124.5B',
          spread: '0.25',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 64,
            neutral: 26,
            bearish: 10,
            titanScore: 82.5,
            orionScore: 0.26,
            liquidity: 99.8,
            iv: 15.4,
            summary: '企业盈利超预期比例达 78%，降息周期宏观流动性充沛。ORION 动态风控系统评级为稳定扩张期。'
          }
        }
      }
    },
    stocks: {
      categoryName: '科技美股',
      instruments: {
        'NVDA': {
          symbol: 'NVDA / NASDAQ',
          name: '英伟达 (NVIDIA Corp)',
          sub: '全球 AI 芯片基础设施霸主 · 加速计算垄断龙头',
          basePrice: 132.80,
          currentPrice: 132.80,
          change24h: 4.89,
          high24h: 135.20,
          low24h: 128.40,
          volume24h: '28.6B',
          spread: '0.02',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 72,
            neutral: 18,
            bearish: 10,
            titanScore: 91.2,
            orionScore: 0.38,
            liquidity: 97.4,
            iv: 48.0,
            summary: 'Blackwell 芯片量产出货指引强劲，全球云厂商资本开支维持双位数扩张。高频动量指标表现强劲，具备持续领跑大盘动能。'
          }
        },
        'AAPL': {
          symbol: 'AAPL / NASDAQ',
          name: '苹果公司 (Apple Inc)',
          sub: '全球消费电子生态核心枢纽 · 端侧 Apple Intelligence 驱动',
          basePrice: 231.40,
          currentPrice: 231.40,
          change24h: 1.05,
          high24h: 233.10,
          low24h: 229.80,
          volume24h: '16.2B',
          spread: '0.02',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 60,
            neutral: 32,
            bearish: 8,
            titanScore: 80.5,
            orionScore: 0.18,
            liquidity: 98.9,
            iv: 21.5,
            summary: '现金流充裕，大额股票回购提供极佳防御底线。端侧 AI 换机周期正在启动，适合稳健底仓配置。'
          }
        },
        'MSFT': {
          symbol: 'MSFT / NASDAQ',
          name: '微软 (Microsoft Corp)',
          sub: '企业级云与企业 AI Copilot 领导者 · OpenAI 核心股东',
          basePrice: 422.60,
          currentPrice: 422.60,
          change24h: 1.35,
          high24h: 426.00,
          low24h: 419.50,
          volume24h: '14.1B',
          spread: '0.03',
          decimals: 2,
          prefix: '$ ',
          aiOutlook: {
            bullish: 66,
            neutral: 25,
            bearish: 9,
            titanScore: 85.0,
            orionScore: 0.20,
            liquidity: 98.2,
            iv: 22.8,
            summary: 'Azure 云服务年化增长率保持高位，Copilot 商业化渗透提速。多策略协同模型给予五星评级。'
          }
        }
      }
    },
    forex: {
      categoryName: '外汇储备',
      instruments: {
        'EURUSD': {
          symbol: 'EUR / USD',
          name: '欧元 / 美元 (Euro)',
          sub: '全球日交易量最大法定货币对 · 欧美利差与贸易晴雨表',
          basePrice: 1.0842,
          currentPrice: 1.0842,
          change24h: -0.15,
          high24h: 1.0875,
          low24h: 1.0820,
          volume24h: '240B',
          spread: '0.0001',
          decimals: 4,
          prefix: '',
          aiOutlook: {
            bullish: 45,
            neutral: 45,
            bearish: 10,
            titanScore: 72.1,
            orionScore: 0.12,
            liquidity: 99.9,
            iv: 7.2,
            summary: '美欧央行降息路径预期重叠，汇率围绕 1.0800-1.0900 区间高频震荡，极度适合跨币种量化套息对冲交易。'
          }
        },
        'USDJPY': {
          symbol: 'USD / JPY',
          name: '美元 / 日元 (Yen)',
          sub: '全球核心套息交易平仓与避险对冲货币对',
          basePrice: 148.65,
          currentPrice: 148.65,
          change24h: 0.42,
          high24h: 149.20,
          low24h: 147.80,
          volume24h: '160B',
          spread: '0.01',
          decimals: 2,
          prefix: '',
          aiOutlook: {
            bullish: 50,
            neutral: 35,
            bearish: 15,
            titanScore: 76.8,
            orionScore: 0.30,
            liquidity: 99.5,
            iv: 12.5,
            summary: '日本央行货币政策正常化进程缓慢，利差支撑美元走强，但需警惕财务省关键阻力点位干预风险。'
          }
        }
      }
    }
  };

  let currentCategory = 'crypto';
  let currentInstrument = 'BTC';
  let currentWindow = '1d';
  let chartType = 'area'; // 'area' or 'candles'
  let indicators = { ma7: true, ma25: true, volume: true };

  // =========================================================================
  // 2. LIVE REAL-TIME TICKER & SOCKET/REST SIMULATOR
  // =========================================================================

  // Try real-time public ticker fetch from CoinGecko or Binance (graceful fallback)
  async function fetchRealCryptoPrices() {
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT"]');
      if (response.ok) {
        const data = await response.json();
        data.forEach(item => {
          if (item.symbol === 'BTCUSDT' && ASSETS.crypto.instruments.BTC) {
            updateInstrumentPrice('BTC', parseFloat(item.price), 'crypto');
          } else if (item.symbol === 'ETHUSDT' && ASSETS.crypto.instruments.ETH) {
            updateInstrumentPrice('ETH', parseFloat(item.price), 'crypto');
          } else if (item.symbol === 'SOLUSDT' && ASSETS.crypto.instruments.SOL) {
            updateInstrumentPrice('SOL', parseFloat(item.price), 'crypto');
          } else if (item.symbol === 'BNBUSDT' && ASSETS.crypto.instruments.BNB) {
            updateInstrumentPrice('BNB', parseFloat(item.price), 'crypto');
          }
        });
      }
    } catch (e) {
      // Graceful local real-time jitter if offline or blocked
    }
  }

  // Periodic live micro-jitter to ensure 24h real-time vitality
  function simulateLiveTicks() {
    const catKeys = Object.keys(ASSETS);
    const randCat = catKeys[Math.floor(Math.random() * catKeys.length)];
    const instKeys = Object.keys(ASSETS[randCat].instruments);
    const randInst = instKeys[Math.floor(Math.random() * instKeys.length)];

    const target = ASSETS[randCat].instruments[randInst];
    if (!target) return;

    // Small jitter between -0.08% and +0.08%
    const deltaPercent = (Math.random() - 0.48) * 0.0016;
    const newPrice = target.currentPrice * (1 + deltaPercent);
    updateInstrumentPrice(randInst, newPrice, randCat);
  }

  function updateInstrumentPrice(instCode, newPrice, cat) {
    const asset = ASSETS[cat]?.instruments[instCode];
    if (!asset) return;

    const oldPrice = asset.currentPrice;
    asset.currentPrice = newPrice;
    const isUp = newPrice >= oldPrice;

    // Format string
    const priceStr = asset.prefix + newPrice.toLocaleString('en-US', {
      minimumFractionDigits: asset.decimals,
      maximumFractionDigits: asset.decimals
    });

    // Update ticker elements
    const tickerPriceEls = document.querySelectorAll(`[data-ticker-price="${instCode}"]`);
    tickerPriceEls.forEach(el => {
      el.textContent = priceStr;
      el.classList.remove('price-flash-up', 'price-flash-down');
      void el.offsetWidth; // re-trigger animation
      el.classList.add(isUp ? 'price-flash-up' : 'price-flash-down');
    });

    // If currently viewed in main terminal, refresh chart & quote
    if (instCode === currentInstrument) {
      const mainPriceEl = document.getElementById('terminal-main-price');
      if (mainPriceEl) {
        mainPriceEl.textContent = priceStr;
        mainPriceEl.classList.remove('price-flash-up', 'price-flash-down');
        void mainPriceEl.offsetWidth;
        mainPriceEl.classList.add(isUp ? 'price-flash-up' : 'price-flash-down');
      }

      // Update Order Book spread
      updateOrderBook(newPrice, asset);
    }
  }

  // Set interval for live ticks
  setInterval(simulateLiveTicks, 2200);
  fetchRealCryptoPrices();
  setInterval(fetchRealCryptoPrices, 15000);

  // Ticker Pause/Resume button
  const tickerPauseBtn = document.getElementById('ticker-pause-toggle');
  const tickerTrack = document.getElementById('market-ticker-track');
  if (tickerPauseBtn && tickerTrack) {
    let isPaused = false;
    tickerPauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      tickerTrack.classList.toggle('paused', isPaused);
      tickerPauseBtn.innerHTML = isPaused ? 
        `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> 恢复滚动` :
        `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> 暂停滚动`;
    });
  }

  // =========================================================================
  // 3. PRO QUANT TERMINAL INTERACTION & CHART CANVAS
  // =========================================================================

  const catTabs = document.querySelectorAll('.terminal-category-tabs .cat-tab');
  const instrumentBar = document.getElementById('instrument-selector-bar');
  const chartCanvas = document.getElementById('pro-chart-canvas');
  let chartCtx = chartCanvas ? chartCanvas.getContext('2d') : null;

  // Setup Responsive Canvas
  function resizeCanvas() {
    if (!chartCanvas) return;
    const rect = chartCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    chartCanvas.width = rect.width * dpr;
    chartCanvas.height = rect.height * dpr;
    if (chartCtx) {
      chartCtx.resetTransform();
      chartCtx.scale(dpr, dpr);
    }
    renderChart();
  }
  window.addEventListener('resize', resizeCanvas);

  // Category Tab Switching
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-cat');
      if (cat && ASSETS[cat]) {
        currentCategory = cat;
        // Select first instrument of new category
        const firstInstKey = Object.keys(ASSETS[cat].instruments)[0];
        currentInstrument = firstInstKey;
        renderInstrumentBar();
        updateTerminalView();
      }
    });
  });

  // Render Instrument Bar
  function renderInstrumentBar() {
    if (!instrumentBar) return;
    instrumentBar.innerHTML = '';
    const insts = ASSETS[currentCategory].instruments;

    Object.keys(insts).forEach(key => {
      const inst = insts[key];
      const pill = document.createElement('button');
      pill.className = `instrument-pill ${key === currentInstrument ? 'active' : ''}`;
      pill.innerHTML = `<strong>${key}</strong> <span style="font-size:0.75rem; opacity:0.8; margin-left:4px;">${inst.symbol.split(' ')[0]}</span>`;
      pill.addEventListener('click', () => {
        currentInstrument = key;
        document.querySelectorAll('.instrument-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        updateTerminalView();
      });
      instrumentBar.appendChild(pill);
    });
  }

  // Timeframe and Chart Type Buttons
  const timeframeBtns = document.querySelectorAll('.timeframe-group .ctrl-btn');
  timeframeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeframeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentWindow = btn.getAttribute('data-window') || '1d';
      renderChart();
    });
  });

  const chartTypeBtns = document.querySelectorAll('.chart-type-toggle .ctrl-btn');
  chartTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chartTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      chartType = btn.getAttribute('data-type') || 'area';
      renderChart();
    });
  });

  // Update Main Terminal Display
  function updateTerminalView() {
    const asset = ASSETS[currentCategory]?.instruments[currentInstrument];
    if (!asset) return;

    // Header Titles
    const titleEl = document.getElementById('terminal-asset-title');
    const subEl = document.getElementById('terminal-asset-sub');
    const priceEl = document.getElementById('terminal-main-price');
    const changeBadgeEl = document.getElementById('terminal-main-change');

    if (titleEl) titleEl.textContent = `${asset.name} · ${asset.symbol}`;
    if (subEl) subEl.textContent = asset.sub;
    if (priceEl) {
      priceEl.textContent = asset.prefix + asset.currentPrice.toLocaleString('en-US', {
        minimumFractionDigits: asset.decimals,
        maximumFractionDigits: asset.decimals
      });
    }

    if (changeBadgeEl) {
      const isUp = asset.change24h >= 0;
      changeBadgeEl.className = `coin-change ${isUp ? 'up' : 'down'}`;
      changeBadgeEl.textContent = `${isUp ? '+' : ''}${asset.change24h}% 24H`;
    }

    // 24H Stats Row
    const statHigh = document.getElementById('stat-high-24h');
    const statLow = document.getElementById('stat-low-24h');
    const statVol = document.getElementById('stat-vol-24h');
    const statSpread = document.getElementById('stat-spread');

    if (statHigh) statHigh.textContent = asset.prefix + asset.high24h.toLocaleString('en-US', { minimumFractionDigits: asset.decimals });
    if (statLow) statLow.textContent = asset.prefix + asset.low24h.toLocaleString('en-US', { minimumFractionDigits: asset.decimals });
    if (statVol) statVol.textContent = `$ ${asset.volume24h}`;
    if (statSpread) statSpread.textContent = asset.spread;

    // AI Outlook & Scenario
    updateAIOpportunities(asset);

    // Update Order Book
    updateOrderBook(asset.currentPrice, asset);

    // Re-draw chart
    renderChart();
  }

  // Update AI Outlook Section
  function updateAIOpportunities(asset) {
    const outlook = asset.aiOutlook;
    if (!outlook) return;

    const fillBull = document.getElementById('ai-bar-bull');
    const fillNeut = document.getElementById('ai-bar-neut');
    const fillBear = document.getElementById('ai-bar-bear');

    const txtBull = document.getElementById('ai-txt-bull');
    const txtNeut = document.getElementById('ai-txt-neut');
    const txtBear = document.getElementById('ai-txt-bear');

    if (fillBull) fillBull.style.width = `${outlook.bullish}%`;
    if (fillNeut) fillNeut.style.width = `${outlook.neutral}%`;
    if (fillBear) fillBear.style.width = `${outlook.bearish}%`;

    if (txtBull) txtBull.textContent = `${outlook.bullish}%`;
    if (txtNeut) txtNeut.textContent = `${outlook.neutral}%`;
    if (txtBear) txtBear.textContent = `${outlook.bearish}%`;

    const titanEl = document.getElementById('ai-titan-score');
    const orionEl = document.getElementById('ai-orion-score');
    const liqEl = document.getElementById('ai-liq-score');
    const ivEl = document.getElementById('ai-iv-score');

    if (titanEl) titanEl.textContent = outlook.titanScore;
    if (orionEl) orionEl.textContent = outlook.orionScore;
    if (liqEl) liqEl.textContent = outlook.liquidity;
    if (ivEl) ivEl.textContent = outlook.iv;

    const descEl = document.getElementById('ai-scenario-summary');
    if (descEl) descEl.textContent = outlook.summary;
  }

  // Order Book Generator & Updater
  function updateOrderBook(centerPrice, asset) {
    const obContainer = document.getElementById('terminal-orderbook-rows');
    if (!obContainer) return;

    let html = '';
    const step = centerPrice * 0.0008;

    // 4 Asks (Red, Sell)
    for (let i = 4; i >= 1; i--) {
      const askPrice = (centerPrice + step * i).toFixed(asset.decimals);
      const size = (Math.random() * 2.8 + 0.4).toFixed(3);
      const depthPct = Math.min(100, Math.floor(Math.random() * 60 + 20));
      html += `
        <div class="orderbook-row ask">
          <div class="orderbook-depth-bar" style="width:${depthPct}%;"></div>
          <span class="ob-price">${askPrice}</span>
          <span style="color:#94a3b8; font-size:0.75rem;">${size}</span>
        </div>
      `;
    }

    // Spread divider
    html += `
      <div class="orderbook-spread-divider">
        <span>实时买卖点差</span>
        <strong>${asset.spread}</strong>
      </div>
    `;

    // 4 Bids (Green, Buy)
    for (let i = 1; i <= 4; i++) {
      const bidPrice = (centerPrice - step * i).toFixed(asset.decimals);
      const size = (Math.random() * 3.5 + 0.6).toFixed(3);
      const depthPct = Math.min(100, Math.floor(Math.random() * 70 + 25));
      html += `
        <div class="orderbook-row bid">
          <div class="orderbook-depth-bar" style="width:${depthPct}%;"></div>
          <span class="ob-price">${bidPrice}</span>
          <span style="color:#94a3b8; font-size:0.75rem;">${size}</span>
        </div>
      `;
    }

    obContainer.innerHTML = html;
  }

  // Interactive High-Res Canvas Chart Rendering
  function generateHistoricalSeries(basePrice, count, volatility) {
    const points = [];
    let p = basePrice * (1 - volatility * 3);
    for (let i = 0; i < count; i++) {
      const change = (Math.random() - 0.47) * volatility * basePrice;
      p += change;
      const open = p;
      const close = p + (Math.random() - 0.49) * volatility * basePrice * 0.8;
      const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5;
      const volume = Math.random() * 100 + 20;
      points.push({ open, high, low, close, volume, price: close });
    }
    // ensure last matches currentPrice approximately
    points[points.length - 1].close = basePrice;
    points[points.length - 1].price = basePrice;
    return points;
  }

  let hoverX = -1;

  if (chartCanvas) {
    chartCanvas.addEventListener('mousemove', (e) => {
      const rect = chartCanvas.getBoundingClientRect();
      hoverX = e.clientX - rect.left;
      renderChart();
    });

    chartCanvas.addEventListener('mouseleave', () => {
      hoverX = -1;
      renderChart();
    });
  }

  function renderChart() {
    if (!chartCtx || !chartCanvas) return;
    const asset = ASSETS[currentCategory]?.instruments[currentInstrument];
    if (!asset) return;

    const width = chartCanvas.getBoundingClientRect().width;
    const height = chartCanvas.getBoundingClientRect().height;
    if (width === 0 || height === 0) return;

    chartCtx.clearRect(0, 0, width, height);

    // Number of points based on timeframe
    const countMap = { '1d': 48, '7d': 70, '1m': 90, '1y': 120 };
    const ptCount = countMap[currentWindow] || 48;
    const series = generateHistoricalSeries(asset.currentPrice, ptCount, 0.006);

    const prices = series.map(s => s.close);
    const minP = Math.min(...series.map(s => s.low)) * 0.998;
    const maxP = Math.max(...series.map(s => s.high)) * 1.002;
    const range = maxP - minP || 1;

    // Draw Subtle Grid Lines
    chartCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    chartCtx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = (height / 5) * i;
      chartCtx.beginPath();
      chartCtx.moveTo(0, y);
      chartCtx.lineTo(width, y);
      chartCtx.stroke();
    }

    const stepX = width / (ptCount - 1);

    if (chartType === 'area') {
      // Area gradient path
      const grad = chartCtx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
      grad.addColorStop(0.7, 'rgba(0, 240, 255, 0.05)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0)');

      chartCtx.beginPath();
      series.forEach((pt, i) => {
        const x = i * stepX;
        const y = height - ((pt.close - minP) / range) * (height * 0.82) - 15;
        if (i === 0) chartCtx.moveTo(x, y);
        else chartCtx.lineTo(x, y);
      });

      // Close path for area
      chartCtx.lineTo(width, height);
      chartCtx.lineTo(0, height);
      chartCtx.closePath();
      chartCtx.fillStyle = grad;
      chartCtx.fill();

      // Top glowing stroke line
      chartCtx.beginPath();
      series.forEach((pt, i) => {
        const x = i * stepX;
        const y = height - ((pt.close - minP) / range) * (height * 0.82) - 15;
        if (i === 0) chartCtx.moveTo(x, y);
        else chartCtx.lineTo(x, y);
      });
      chartCtx.strokeStyle = '#00f0ff';
      chartCtx.lineWidth = 2.4;
      chartCtx.shadowColor = 'rgba(0, 240, 255, 0.6)';
      chartCtx.shadowBlur = 10;
      chartCtx.stroke();
      chartCtx.shadowBlur = 0; // reset
    } else {
      // Candlestick K-Line Rendering
      const candleW = Math.max(3, stepX * 0.65);
      series.forEach((pt, i) => {
        const x = i * stepX;
        const isUp = pt.close >= pt.open;
        const color = isUp ? '#00ff87' : '#ff3366';

        const openY = height - ((pt.open - minP) / range) * (height * 0.8) - 15;
        const closeY = height - ((pt.close - minP) / range) * (height * 0.8) - 15;
        const highY = height - ((pt.high - minP) / range) * (height * 0.8) - 15;
        const lowY = height - ((pt.low - minP) / range) * (height * 0.8) - 15;

        // Wick
        chartCtx.strokeStyle = color;
        chartCtx.lineWidth = 1.2;
        chartCtx.beginPath();
        chartCtx.moveTo(x, highY);
        chartCtx.lineTo(x, lowY);
        chartCtx.stroke();

        // Body
        chartCtx.fillStyle = color;
        const topY = Math.min(openY, closeY);
        const bodyH = Math.max(2, Math.abs(closeY - openY));
        chartCtx.fillRect(x - candleW / 2, topY, candleW, bodyH);
      });
    }

    // Volume bars at bottom
    const maxVol = Math.max(...series.map(s => s.volume)) || 1;
    series.forEach((pt, i) => {
      const x = i * stepX;
      const volH = (pt.volume / maxVol) * 35;
      chartCtx.fillStyle = pt.close >= pt.open ? 'rgba(0, 255, 135, 0.2)' : 'rgba(255, 51, 102, 0.2)';
      chartCtx.fillRect(x - 2, height - volH, 4, volH);
    });

    // Crosshair & Tooltip when hovering
    if (hoverX >= 0 && hoverX <= width) {
      const idx = Math.min(ptCount - 1, Math.max(0, Math.round(hoverX / stepX)));
      const activePt = series[idx];
      const ptY = height - ((activePt.close - minP) / range) * (height * 0.82) - 15;

      // Vertical line
      chartCtx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      chartCtx.setLineDash([4, 4]);
      chartCtx.beginPath();
      chartCtx.moveTo(hoverX, 0);
      chartCtx.lineTo(hoverX, height);
      chartCtx.stroke();

      // Horizontal line
      chartCtx.beginPath();
      chartCtx.moveTo(0, ptY);
      chartCtx.lineTo(width, ptY);
      chartCtx.stroke();
      chartCtx.setLineDash([]); // reset

      // Target circle
      chartCtx.fillStyle = '#00f0ff';
      chartCtx.beginPath();
      chartCtx.arc(hoverX, ptY, 4, 0, Math.PI * 2);
      chartCtx.fill();

      // Tooltip HUD update
      const hudEl = document.getElementById('chart-tooltip-hud');
      if (hudEl) {
        hudEl.style.display = 'flex';
        hudEl.innerHTML = `
          <span>收盘: <strong>${asset.prefix}${activePt.close.toFixed(asset.decimals)}</strong></span>
          <span>高: <strong>${asset.prefix}${activePt.high.toFixed(asset.decimals)}</strong></span>
          <span>低: <strong>${asset.prefix}${activePt.low.toFixed(asset.decimals)}</strong></span>
          <span>量: <strong>${activePt.volume.toFixed(1)}M</strong></span>
        `;
      }
    }
  }

  // AI Interactive Question Prompts
  const aiChips = document.querySelectorAll('.ai-chip-btn');
  const aiAnswerBox = document.getElementById('ai-answer-preview');
  aiChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q');
      if (!aiAnswerBox) return;

      aiAnswerBox.style.display = 'block';
      aiAnswerBox.innerHTML = `
        <div style="display:flex; align-items:center; gap:6px; color:var(--portal-cyan); font-weight:700; margin-bottom:4px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          SPARK AI 量化研报实时生成：
        </div>
        <p style="margin:0; font-size:0.8rem; color:#e2e8f0;">
          <strong>针对问题：“${chip.textContent.trim()}”</strong><br>
          经 SPARK TITAN 趋势网络与高频流动性引擎联合测算：当前标的在关键流动性深度上表现出净多头集中态势，波动率溢价回落，符合多因子量化配置的进场参数。建议重点关注突破有效性确认点。
        </p>
      `;
    });
  });

  // Initialize Terminal
  renderInstrumentBar();
  updateTerminalView();
  setTimeout(resizeCanvas, 100);

  // =========================================================================
  // 4. THE SPARK LIBRARY - 资料中心引擎 (Filters + Search + Modals)
  // =========================================================================

  const libFilterBtns = document.querySelectorAll('.lib-filter-btn');
  const docCards = document.querySelectorAll('.doc-card');
  const searchInput = document.getElementById('library-search-input');

  // Filter Pills Clicking
  libFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      libFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.getAttribute('data-filter');
      applyLibraryFilters(filterType, searchInput ? searchInput.value.trim().toLowerCase() : '');
    });
  });

  // Instant Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('.lib-filter-btn.active');
      const filterType = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      applyLibraryFilters(filterType, e.target.value.trim().toLowerCase());
    });
  }

  function applyLibraryFilters(category, query) {
    let visibleCount = 0;
    docCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const cardTitle = card.querySelector('.doc-card-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.doc-card-desc')?.textContent.toLowerCase() || '';
      const cardTags = card.getAttribute('data-tags')?.toLowerCase() || '';

      const matchesCat = category === 'all' || cardCat === category;
      const matchesQuery = !query || cardTitle.includes(query) || cardDesc.includes(query) || cardTags.includes(query);

      if (matchesCat && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const emptyNotice = document.getElementById('library-empty-notice');
    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // =========================================================================
  // 5. IN-APP MODAL VIEWERS (Doc Reader, Video Player, Multilingual Growth Plan)
  // =========================================================================

  // Generic modal backdrop closer
  const allModals = document.querySelectorAll('.custom-modal-backdrop');
  allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllCustomModals();
      }
    });
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeAllCustomModals();
      });
    }
  });

  function closeAllCustomModals() {
    allModals.forEach(m => m.classList.remove('open'));
    // Stop any playing video
    const videoEl = document.getElementById('modal-charity-video');
    if (videoEl) videoEl.pause();
    document.body.style.overflow = '';
  }

  // ESC key closes any open modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllCustomModals();
      const deckModal = document.getElementById('presentation-modal-container');
      if (deckModal) {
        deckModal.classList.remove('open');
        document.body.classList.remove('mode-slide');
      }
      const cmdPalette = document.getElementById('cmd-palette-modal');
      if (cmdPalette) cmdPalette.classList.remove('open');
    }

    // Cmd+K / Ctrl+K opens Command Palette
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
  });

  // 5.1 Doc Reader Modal Triggers
  const docDataMap = {
    'doc-pitch-deck': {
      title: 'SPARK UNION CAPITAL 企业官方商业模式介绍 (23P)',
      badge: '商业路演 · PDF',
      content: `
        <h4 style="color:#00f0ff; margin-bottom:8px;">核心定位与模式大纲</h4>
        <p>SPARK UNION CAPITAL INC. 成立于2020年，总部位于美国科罗拉多州，聚焦多资产投资与 AI 量化交易。本文件系统阐述了 Spark One 的核心竞争壁垒与全球商业拓展路径：</p>
        <ul style="padding-left:20px; line-height:1.8; margin-bottom:16px;">
          <li><strong>01-05P 时代变革与行业痛点：</strong>传统金融资产门槛高、透明度差、散户缺乏专业量化工具；</li>
          <li><strong>06-11P 核心技术架构：</strong>TITAN 趋势量化引擎、ORION 动态多维风控网络、链上 100% 储备审计；</li>
          <li><strong>12-16P 全球多资产配置矩阵：</strong>黄金对冲、美股大盘套利、加密数字资产自适应平衡；</li>
          <li><strong>17-23P S1-S9 会员激励成长体系：</strong>直推/团队清晰考核标准、全球生态贡献分红阶梯。</li>
        </ul>
        <div style="background:rgba(0,240,255,0.06); padding:16px; border-radius:12px; border:1px solid rgba(0,240,255,0.2);">
          <strong>💡 快速建议：</strong>你也可以直接在站内点击右上角“放映 23 页 Pitch Deck”开启全屏幻灯片沉浸放映！
        </div>
      `,
      downloadUrl: 'assets/docs/SPARK UNION CAPITAL INC. 企业介绍PPT.pdf'
    },
    'doc-msb': {
      title: '美国财政部 FinCEN MSB 监管登记备案证书',
      badge: '官方合规 · MSB',
      content: `
        <h4 style="color:#00ff87; margin-bottom:8px;">官方合规监管登记说明</h4>
        <p>SPARK UNION CAPITAL INC. 已依法完成美国财政部金融犯罪执法网络（FinCEN - Financial Crimes Enforcement Network）之货币服务商（MSB - Money Services Business）合规备案登记。</p>
        <div style="background:rgba(255,255,255,0.03); padding:16px; border-radius:12px; border:1px solid rgba(255,255,255,0.08); margin:14px 0; font-family:var(--font-portal-mono);">
          <div><strong>登记主体：</strong>SPARK UNION CAPITAL INC.</div>
          <div><strong>备案属地：</strong>State of Colorado, USA</div>
          <div><strong>业务许可范围：</strong>Dealer in Foreign Exchange, Money Transmitter, Virtual Currency Services</div>
          <div><strong>合规治理：</strong>定期实施第三方 AML/CFT 反洗钱与反恐融资独立穿透式审计。</div>
        </div>
        <p style="font-size:0.85rem; color:#94a3b8;">* 提示：根据国际监管披露惯例，MSB 登记体现合规运营规范，不构成政府机构对任何投资产品的担保或收益承诺。</p>
      `,
      downloadUrl: 'assets/docs/企业宣传资料.docx'
    },
    'doc-corporate': {
      title: '美国科罗拉多州政府公司登记注册证书存证',
      badge: '州务卿存证 · CORPORATE',
      content: `
        <h4 style="color:#00f0ff; margin-bottom:8px;">公司合法登记与存续证明</h4>
        <p>本文件为美国科罗拉多州州务卿办公室（Colorado Secretary of State）签发之公司合法成立与良好存续证明（Certificate of Good Standing）。</p>
        <ul style="padding-left:20px; line-height:1.8; margin-bottom:14px;">
          <li><strong>成立年份：</strong>2020 年</li>
          <li><strong>企业性质：</strong>Corporation (C-Corp)</li>
          <li><strong>法定注册办公室：</strong>Denver, Colorado, USA</li>
          <li><strong>业务存续状态：</strong>Good Standing / Active（正常合规存续）</li>
        </ul>
      `,
      downloadUrl: 'assets/docs/企业宣传资料.docx'
    },
    'doc-gold-quant': {
      title: 'AI 黄金量化交易专题研报：如何重塑未来金融市场格局',
      badge: '深度投研 · QUANT REPORT',
      content: `
        <h4 style="color:#fbbf24; margin-bottom:8px;">黄金量化交易专题研报提要</h4>
        <p>过去几十年里，黄金一直是全球最稳定的避险资产。如今，传统的人工盯盘与技术面分析正在被“AI 高频量化对冲”彻底颠覆。本研报由 SPARK 投研实验室联合编制：</p>
        <ul style="padding-left:20px; line-height:1.8; margin-bottom:16px;">
          <li><strong>一、宏观环境重构：</strong>地缘局势、美元信用波动与全球央行战略增持黄金；</li>
          <li><strong>二、传统交易模式局限：</strong>主观情绪干扰、盯盘时差滞后、静态止损点容易遭遇流动性踩踏；</li>
          <li><strong>三、SPARK AI 黄金策略优势：</strong>
            <ul style="margin-top:6px;">
              <li>毫秒级跨交易所流动性聚合与深度嗅探；</li>
              <li>基于 Transformer 的跨周期多空对冲模型，最大回撤控制在 4.2% 以内；</li>
              <li>7×24H 自适应微调网格与波动率动态平衡。</li>
            </ul>
          </li>
        </ul>
      `,
      downloadUrl: 'assets/docs/星火联合资本：AI黄金量化交易如何重塑未来金融市场格局.docx'
    },
    'doc-whitepaper': {
      title: 'AI 驱动下的新一代全球资本管理平台：技术架构白皮书',
      badge: '技术架构 · WHITEPAPER',
      content: `
        <h4 style="color:#00f0ff; margin-bottom:8px;">技术架构与多策略协同体系</h4>
        <p>随着全球金融市场进入数字化与智能化时代，传统资产管理模式正在被人工智能、大数据与量化技术重新定义。SPARK 架构白皮书涵盖以下核心模块：</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:16px 0;">
          <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
            <strong style="color:#00f0ff;">TITAN 趋势预测网络</strong>
            <p style="font-size:0.8rem; color:#94a3b8; margin:4px 0 0;">利用长短记忆深度神经网络，捕捉跨市场高频波动特征与宏观拐点。</p>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
            <strong style="color:#00ff87;">ORION 动态风控引擎</strong>
            <p style="font-size:0.8rem; color:#94a3b8; margin:4px 0 0;">实时监测在险价值（VaR）、流动性深度及杠杆穿透率，实现秒级自动避险。</p>
          </div>
        </div>
      `,
      downloadUrl: 'assets/docs/星火联合资本：AI驱动下的新一代全球资本管理平台.docx'
    }
  };

  const previewDocBtns = document.querySelectorAll('.trigger-preview-doc');
  const docModal = document.getElementById('custom-doc-modal');
  const docModalTitle = document.getElementById('doc-modal-title');
  const docModalBadge = document.getElementById('doc-modal-badge');
  const docModalBody = document.getElementById('doc-modal-body');
  const docModalDownload = document.getElementById('doc-modal-download-link');

  previewDocBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docKey = btn.getAttribute('data-doc');
      const data = docDataMap[docKey];
      if (data && docModal) {
        if (docModalTitle) docModalTitle.textContent = data.title;
        if (docModalBadge) docModalBadge.textContent = data.badge;
        if (docModalBody) docModalBody.innerHTML = data.content;
        if (docModalDownload) {
          docModalDownload.href = data.downloadUrl;
          docModalDownload.setAttribute('download', data.title);
        }
        docModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 5.2 Charity TV Video Modal Trigger
  const triggerVideoBtns = document.querySelectorAll('.trigger-play-video');
  const videoModal = document.getElementById('custom-video-modal');
  const videoEl = document.getElementById('modal-charity-video');

  triggerVideoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (videoModal && videoEl) {
        videoModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        videoEl.play().catch(() => {});
      }
    });
  });

  // 5.3 Multilingual Growth Plan Lightbox
  const triggerGrowthBtns = document.querySelectorAll('.trigger-growth-lightbox');
  const growthModal = document.getElementById('custom-growth-modal');
  const growthImg = document.getElementById('growth-modal-img');
  const growthLangBtns = document.querySelectorAll('.growth-lang-btn');

  const growthImages = {
    'zh': 'assets/growth/GrowthPlan-ZH.jpg',
    'en': 'assets/growth/GrowthPlan-EN.jpg',
    'ko': 'assets/growth/GrowthPlan-KO.jpg'
  };

  triggerGrowthBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (growthModal) {
        growthModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  growthLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      growthLangBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      if (growthImg && growthImages[lang]) {
        growthImg.src = growthImages[lang];
      }
    });
  });

  // 5.4 Command Palette (Cmd+K)
  const cmdPaletteModal = document.getElementById('cmd-palette-modal');
  const cmdSearchInput = document.getElementById('cmd-palette-input');
  const cmdTriggerBtn = document.getElementById('open-cmd-palette-btn');

  function openCommandPalette() {
    if (!cmdPaletteModal) return;
    cmdPaletteModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (cmdSearchInput) {
        cmdSearchInput.value = '';
        cmdSearchInput.focus();
      }
    }, 100);
  }

  if (cmdTriggerBtn) {
    cmdTriggerBtn.addEventListener('click', openCommandPalette);
  }

  const cmdItems = document.querySelectorAll('.cmd-item');
  if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      cmdItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
      });
    });
  }

  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      closeAllCustomModals();
      if (target.startsWith('#')) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (target === 'deck') {
        const deckModal = document.getElementById('presentation-modal-container');
        if (deckModal) deckModal.classList.add('open');
      } else if (target === 'video') {
        if (videoModal && videoEl) {
          videoModal.classList.add('open');
          videoEl.play().catch(() => {});
        }
      } else if (target === 'poster') {
        if (posterModal && posterImg) {
          posterImg.src = 'assets/posters/spark-ai-blueprint.jpg';
          if (posterTitle) {
            posterTitle.innerHTML = `
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--portal-cyan)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              SPARK ONE：AI量化全球财富蓝图
            `;
          }
          if (posterDownload) {
            posterDownload.href = 'assets/posters/spark-ai-blueprint.jpg';
            posterDownload.setAttribute('download', 'SPARK ONE 全球财富蓝图.jpg');
          }
          posterModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  // 5.5 Presentation Slide Fullscreen Modal Switcher (Preserving Pitch Deck)
  const openDeckBtns = document.querySelectorAll('.trigger-open-deck');
  const deckModal = document.getElementById('presentation-modal-container');
  const closeDeckBtn = document.getElementById('close-deck-modal-btn');

  if (deckModal) {
    openDeckBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        deckModal.classList.add('open');
        document.body.classList.add('mode-slide');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeDeckBtn) {
      closeDeckBtn.addEventListener('click', () => {
        deckModal.classList.remove('open');
        document.body.classList.remove('mode-slide');
        document.body.style.overflow = '';
      });
    }
  }

  // 5.5.1 Dedicated Visual Poster & Infographic Lightbox Modal
  const triggerPosterBtns = document.querySelectorAll('.trigger-poster-modal');
  const posterModal = document.getElementById('custom-poster-modal');
  const posterImg = document.getElementById('poster-modal-img');
  const posterTitle = document.getElementById('poster-modal-title');
  const posterDownload = document.getElementById('poster-modal-download');

  triggerPosterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const posterSrc = btn.getAttribute('data-poster');
      const title = btn.getAttribute('data-title') || '官方高清海报原图';
      if (posterModal && posterImg && posterSrc) {
        posterImg.src = posterSrc;
        if (posterTitle) {
          posterTitle.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--portal-cyan)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            ${title}
          `;
        }
        if (posterDownload) {
          posterDownload.href = posterSrc;
          posterDownload.setAttribute('download', `${title}.jpg`);
        }
        posterModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 5.6 3D Discovery Tabs Switcher
  const modelTabs = document.querySelectorAll('.model-tab-btn');
  const modelTitleEl = document.getElementById('sp-model-title');
  const modelDescEl = document.getElementById('sp-model-desc');
  const modelConceptEl = document.getElementById('sp-model-concept');

  const modelData = {
    '01': {
      title: '资产数字化 (Digital Assets)',
      desc: '将传统资产转化为可编程的数字代币，实现碎片化所有权、增强流动性与全球可及性。',
      concept: '资产确权与链上登记 · 可编程资产结构设计'
    },
    '02': {
      title: '智能量化核心 (Intelligent Core)',
      desc: '基于大模型与机器学习的自适应算法策略网络，实现毫秒级全球资产动态平衡与风控。',
      concept: 'TITAN 趋势网络 · ORION 动态多维风控'
    },
    '03': {
      title: '实物价值映射 (Physical Mapping)',
      desc: '实体贵金属、真实不动产及优质实物资产的链上信用映射与合规审计保障。',
      concept: '100% 储备金证明 · 独立第三方持牌审计'
    }
  };

  modelTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      modelTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const id = btn.getAttribute('data-model');
      if (id && modelData[id]) {
        if (modelTitleEl) modelTitleEl.textContent = modelData[id].title;
        if (modelDescEl) modelDescEl.textContent = modelData[id].desc;
        if (modelConceptEl) modelConceptEl.textContent = modelData[id].concept;
      }
    });
  });

  // =========================================================================
  // 6. MOBILE FIRST UX CONTROLLERS (Drawer, Bottom Dock, Segmented Terminal)
  // =========================================================================

  // Mobile Nav Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-nav-item');
  const dockMoreBtn = document.getElementById('dock-more-btn');

  function openMobileDrawer() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('open');
    if (mobileMenuToggle) mobileMenuToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('open');
    if (mobileMenuToggle) mobileMenuToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  if (dockMoreBtn) {
    dockMoreBtn.addEventListener('click', openMobileDrawer);
  }

  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  const mobSearchTrigger = document.getElementById('mobile-search-trigger');
  if (mobSearchTrigger) {
    mobSearchTrigger.addEventListener('click', () => {
      closeMobileDrawer();
      openCommandPalette();
    });
  }

  const mobSoundTrigger = document.getElementById('mobile-sound-trigger');
  const soundBtn = document.getElementById('sound-toggle-btn');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (window.SparkSound && typeof window.SparkSound.toggle === 'function') {
        const enabled = window.SparkSound.toggle();
        soundBtn.style.opacity = enabled ? '1' : '0.4';
        soundBtn.style.borderColor = enabled ? 'var(--portal-cyan)' : 'var(--portal-border)';
        soundBtn.title = enabled ? '科技音效已开启' : '科技音效已静音';
        if (enabled && typeof window.SparkSound.playBlip === 'function') {
          window.SparkSound.playBlip();
        }
      }
    });
  }

  if (mobSoundTrigger) {
    mobSoundTrigger.addEventListener('click', () => {
      if (soundBtn) soundBtn.click();
    });
  }

  // Mobile Terminal Segmented View Switcher
  const mobViewBtns = document.querySelectorAll('.mob-view-btn');
  const chartBox = document.querySelector('.terminal-chart-box');
  const asideBox = document.querySelector('.terminal-aside-box');
  const orderBookCard = asideBox ? asideBox.querySelector('.aside-card:first-child') : null;
  const aiOutlookCard = asideBox ? asideBox.querySelector('.ai-scenario-card') : null;

  mobViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mobViewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.getAttribute('data-view');
      if (window.innerWidth <= 860) {
        if (view === 'chart') {
          if (chartBox) chartBox.style.display = 'flex';
          if (asideBox) asideBox.style.display = 'none';
        } else if (view === 'depth') {
          if (chartBox) chartBox.style.display = 'none';
          if (asideBox) asideBox.style.display = 'flex';
          if (orderBookCard) orderBookCard.style.display = 'block';
          if (aiOutlookCard) aiOutlookCard.style.display = 'none';
        } else if (view === 'outlook') {
          if (chartBox) chartBox.style.display = 'none';
          if (asideBox) asideBox.style.display = 'flex';
          if (orderBookCard) orderBookCard.style.display = 'none';
          if (aiOutlookCard) aiOutlookCard.style.display = 'flex';
        }
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      if (chartBox) chartBox.style.display = 'flex';
      if (asideBox) asideBox.style.display = 'flex';
      if (orderBookCard) orderBookCard.style.display = 'block';
      if (aiOutlookCard) aiOutlookCard.style.display = 'flex';
    } else {
      const activeMobView = document.querySelector('.mob-view-btn.active');
      if (activeMobView) activeMobView.click();
    }
  });

  // Unified Desktop & Mobile Nav Scroll Spy Tracking
  const desktopNavLinks = document.querySelectorAll('.nav-segment-link');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const dockTabs = document.querySelectorAll('.dock-tab-btn');

  const trackedSections = [
    { id: 'home', el: document.getElementById('home') || document.getElementById('hero') },
    { id: 'terminal', el: document.getElementById('terminal') },
    { id: 'library-section', el: document.getElementById('library-section') },
    { id: 'scale', el: document.getElementById('scale') },
    { id: 'discovery', el: document.getElementById('discovery') },
    { id: 'impact', el: document.getElementById('impact') }
  ];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 180;
    let currentId = 'home';

    trackedSections.forEach(sec => {
      if (sec.el && sec.el.offsetTop <= scrollY) {
        currentId = sec.id;
      }
    });

    // Update Desktop Capsule Nav Active
    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}` || (currentId === 'home' && href === '#hero')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Mobile Bottom Dock Active
    dockTabs.forEach(tab => {
      const href = tab.getAttribute('href');
      if (href === `#${currentId}` || (currentId === 'home' && href === '#hero')) {
        tab.classList.add('active');
      } else if (href && href.startsWith('#')) {
        tab.classList.remove('active');
      }
    });

    // Update Mobile Drawer Items Active
    mobileNavItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${currentId}` || (currentId === 'home' && href === '#hero')) {
        item.classList.add('active');
      } else if (href && href.startsWith('#')) {
        item.classList.remove('active');
      }
    });
  }, { passive: true });

  // Interactive 3D Parallax Tilt on Hero Visual Artwork
  const heroArt = document.getElementById('hero-interactive-art');
  const heroSection = document.getElementById('home');
  if (heroArt && heroSection && window.matchMedia('(min-width: 860px)').matches) {
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 20; // max 20px
      targetY = y * 16;
    });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const updateParallax = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      heroArt.style.transform = `translate(${curX}px, ${curY}px) rotate(${curX * 0.08}deg)`;
      requestAnimationFrame(updateParallax);
    };
    requestAnimationFrame(updateParallax);
  }
});
