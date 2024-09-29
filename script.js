fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const maxAmount = Math.max(...data.map(item => item.amount)); // Get the max value from the dataset
    
    const chartHeight = 150; // Adjust this value for the maximum container height
    const minHeight = 10; // Minimum height for smaller bars

    data.forEach(item => {
      // Create the bar element
      const bar = document.createElement('div');
      bar.classList.add('bar');

      // Calculate the height percentage
      let heightPercent = (item.amount / maxAmount) * chartHeight;
      
      // Ensure a minimum height for small values
      if (heightPercent < minHeight) {
        heightPercent = minHeight;
      }

      // Apply the calculated or minimum height
      bar.style.height = `${heightPercent}px`;

      // Set a custom color for the highest value
      if (item.amount === maxAmount) {
        bar.style.backgroundColor = 'hsl(186, 34%, 60%)';  // Highlight the highest value
      }

      // Append the tooltip for hover effect
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = `$${item.amount}`;

      // Append the tooltip to the bar
      bar.appendChild(tooltip);

      // Create the container for the bar and the day label
      const barContainer = document.createElement('div');
      barContainer.classList.add('bar-container');
      
      // Add the day label
      const dayLabel = document.createElement('p');
      dayLabel.classList.add('day-label');
      dayLabel.textContent = item.day;

      // Append the bar and day label to the bar container
      barContainer.appendChild(bar);
      barContainer.appendChild(dayLabel);

      // Append the bar container to the chart section
      document.getElementById('bar-chart').appendChild(barContainer);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
