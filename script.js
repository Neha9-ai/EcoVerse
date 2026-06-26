const assistantForm = document.getElementById('assistant-form');
const assistantMessages = document.getElementById('assistant-messages');
const assistantInput = document.getElementById('assistant-input');
const calcForm = document.getElementById('calc-form');
const resultNumber = document.getElementById('result-number');
const resultLabel = document.getElementById('result-label');
const tipsList = document.getElementById('tips-list');

function appendMessage(text, type) {
  const bubble = document.createElement('div');
  bubble.className = `message ${type}`;
  bubble.textContent = text;
  assistantMessages.appendChild(bubble);
}

function generateAssistantReply(query) {
  const lower = query.toLowerCase();

  if (lower.includes('solar')) {
    return 'Solar is a strong choice if your roof gets solid sun and your electricity bill is high. Start with a small home audit before installing panels.';
  }

  if (lower.includes('transport') || lower.includes('car')) {
    return 'Switching to public transport, biking, or carpooling can lower emissions quickly. Even one fewer car trip per week helps.';
  }

  if (lower.includes('waste') || lower.includes('recycle')) {
    return 'Separate recyclables, compost organics, and take e-waste to certified drop-off points to reduce landfill impact.';
  }

  if (lower.includes('tree') || lower.includes('plant')) {
    return 'Native trees provide shade, boost biodiversity, and store carbon over time. Choose species that match your local climate.';
  }

  return 'A strong first step is reducing energy waste, eating more plant-based meals, and choosing low-impact transport whenever possible.';
}

assistantForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = assistantInput.value.trim();

  if (!inputValue) {
    return;
  }

  appendMessage(inputValue, 'user');
  assistantInput.value = '';

  window.setTimeout(() => {
    appendMessage(generateAssistantReply(inputValue), 'bot');
  }, 300);
});

calcForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const transport = Number(event.target.transport.value) || 0;
  const electricity = Number(event.target.electricity.value) || 0;
  const flights = Number(event.target.flights.value) || 0;
  const food = Number(event.target.food.value) || 0;
  const shopping = Number(event.target.shopping.value) || 0;

  const annualEmissions = transport * 0.18 * 12 + electricity * 0.4 * 12 + flights * 600 + food * 2.5 * 12 + shopping * 0.15 * 12;
  const rounded = Math.round(annualEmissions);

  let label = 'Balanced';
  let tips = [
    'Use public transport or bike for short trips when possible.',
    'Switch off idle devices and choose efficient lighting.'
  ];

  if (rounded > 9000) {
    label = 'Needs attention';
    tips = [
      'Consider reducing long flights and choosing local travel.',
      'Lower energy consumption and shop more deliberately.'
    ];
  } else if (rounded > 5000) {
    label = 'Moderate footprint';
    tips = [
      'Small habit changes can make a big difference over a year.',
      'Aim to cut one major source of emissions this month.'
    ];
  }

  resultNumber.textContent = `${rounded.toLocaleString()} kg`;
  resultLabel.textContent = label;
  tipsList.innerHTML = tips.map((tip) => `<li>${tip}</li>`).join('');
});
