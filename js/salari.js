document
  .getElementById("predictionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    // Obtener los valores de los campos
    const python = document.getElementById("python").value;
    const excel = document.getElementById("excel").value;
    const sql = document.getElementById("sql").value;
    const aws = document.getElementById("aws").value;
    const groupedRating = document.getElementById("grouped_rating").value;
    const groupTitle = document.getElementById("group_title").value;
    const groupSector = document.getElementById("group_sector").value;

    const data = {
      python: python,
      excel: excel,
      sql: sql,
      aws: aws,
      grouped_rating: groupedRating,
      group_title: groupTitle,
      group_sector: groupSector,
    };

    // Enviar la solicitud POST con los datos
    fetch("https://test-981460085209.us-east1.run.app//predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Mostrar el resultado en el div
        document.getElementById("predictionResult").innerHTML = data.prediction;
      })
      .catch((error) => console.error("Error:", error));
  });
