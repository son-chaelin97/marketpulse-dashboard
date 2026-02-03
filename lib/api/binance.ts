const getBinanceData = async () => {
  const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');

  if (response.ok) {
    const json = await response.json();
    return json;
  }
};

export { getBinanceData };
