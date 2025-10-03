let hoist;

const s = {
  pickedState: null,
  distance: null,
  names: {
    "Alabama": "Alabama0000000",
    "Alaska": "Alaska00000000",
    "Arizona": "Arizona0000000",
    "Arkansas": "Arkansas000000",
    "California": "California0000",
    "Colorado": "Colorado000000",
    "Connecticut": "Connecticut000",
    "Delaware": "Delaware000000",
    "Florida": "Florida0000000",
    "Georgia": "Georgia0000000",
    "Hawaii": "Hawaii00000000",
    "Idaho": "Idaho000000000",
    "Illinois": "Illinois000000",
    "Indiana": "Indiana0000000",
    "Iowa": "Iowa0000000000",
    "Kansas": "Kansas00000000",
    "Kentucky": "Kentucky000000",
    "Louisiana": "Louisiana00000",
    "Maine": "Maine000000000",
    "Maryland": "Maryland000000",
    "Massachusetts": "Massachusetts0",
    "Michigan": "Michigan000000",
    "Minnesota": "Minnesota00000",
    "Mississippi": "Mississippi000",
    "Missouri": "Missouri000000",
    "Montana": "Montana0000000",
    "Nebraska": "Nebraska000000",
    "Nevada": "Nevada00000000",
    "New Hampshire": "New Hampshire0",
    "New Jersey": "New Jersey0000",
    "New Mexico": "New Mexico0000",
    "New York": "New York000000",
    "North Carolina": "North Carolina",
    "North Dakota": "North Dakota00",
    "Ohio": "Ohio0000000000",
    "Oklahoma": "Oklahoma000000",
    "Oregon": "Oregon00000000",
    "Pennsylvania": "Pennsylvania00",
    "Rhode Island": "Rhode Island00",
    "South Carolina": "South Carolina",
    "South Dakota": "South Dakota00",
    "Tennessee": "Tennessee00000",
    "Texas": "Texas000000000",
    "Utah": "Utah0000000000",
    "Vermont": "Vermont0000000",
    "Virginia": "Virginia000000",
    "Washington": "Washington0000",
    "West Virginia": "West Virginia0",
    "Wisconsin": "Wisconsin00000",
    "Wyoming": "Wyoming0000000",
  },
};

function getSpans(a, b) {
  const aLetters = a.split("");
  const bLetters = b.split("").map((l) => l.toLowerCase());
  return aLetters.map((l) => {
    if (bLetters.includes(l.toLowerCase())) {
      return `<span class="hit">${l}</span>`;
    } else {
      return `<span class="miss">${l}</span>`;
    }
  }).join("");
}

function updateClosest(stateName) {
  s.pickedState = stateName;
  s.distance = 100;
  s.neighbors = [];
  const aLetters = stateName.split("").map((l) => l.toLowerCase());
  Object.entries(s.names).forEach(([name, token]) => {
    if (stateName !== name) {
      let checkCount = 0;
      const bLetters = name.split("").map((l) => l.toLowerCase());
      aLetters.forEach((l) => {
        if (!bLetters.includes(l)) {
          checkCount += 1;
        }
      });
      if (checkCount < s.distance) {
        s.distance = checkCount;
        s.neighbors = [name];
      } else if (checkCount === s.distance) {
        s.neighbors.push(name);
      }
    }
  });
  console.log(s.neighbors);
  console.log(s.distance);
}

export default class {
  bittyInit() {
    document.documentElement.style.setProperty("--page-visibility", "visible");
    hoist = this;
  }

  async init(_event, _el) {
    let response = await fetch("/data/states-albers-10m.json");
    if (!response.ok) {
      throw new Error("There was a problem getting the data");
    } else {
      s.data = await response.json();
      this.makeMap();
    }
  }

  count(_event, el) {
    if (s.distance === 1) {
      el.innerHTML = `${s.distance} Missing Letter`;
    } else {
      el.innerHTML = `${s.distance} Missing Letters`;
    }
  }

  neighbors(_event, el) {
    el.innerHTML = "";
    s.neighbors.forEach((neighbor) => {
      const li = document.createElement("li");
      const spans1 = getSpans(s.pickedState, neighbor);
      const spans2 = getSpans(neighbor, s.pickedState);
      li.innerHTML = `${spans1}<br />${spans2}`;
      el.appendChild(li);
    });
    this.api.forward(null, "count");
  }

  makeMap() {
    const us = s.data;

    const width = 975;
    const height = 610;

    // const zoom = d3.zoom()
    //   .scaleExtent([1, 8])
    //   .on("zoom", zoomed);

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");
    //  .on("click", reset);

    const path = d3.geoPath();

    const g = svg.append("g");

    const states = g.append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .join("path")
      .on("click", clicked)
      .attr("d", path);

    states.append("title")
      .text((d) => d.properties.name);

    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

    // svg.call(zoom);

    // function reset() {
    //   states.transition().style("fill", null);
    //   svg.transition().duration(750).call(
    //     zoom.transform,
    //     d3.zoomIdentity,
    //     d3.zoomTransform(svg.node()).invert([width / 2, height / 2]),
    //   );
    // }

    function clicked(event, d) {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      const stateName = event.target.__data__.properties.name;
      updateClosest(stateName);
      hoist.api.forward(event, "neighbors");

      event.stopPropagation();
      // console.log(stateName);
      // console.log(s.keys[stateName]);

      /*


      states.transition().style("fill", null);
      d3.select(this).transition().style("fill", "red");
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)),
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node()),
      );
      */
    }

    // function zoomed(event) {
    //   const { transform } = event;
    //   g.attr("transform", transform);
    //   g.attr("stroke-width", 1 / transform.k);
    // }

    container.append(svg.node());
  }
}
