/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */

// const d3 = require("d3");

// const topojson = require("topojson");

export default function Earth() {
    const width = 900;
    const height = 900;
    const config = {
        speed: 0.01,
        verticalTilt: -30,
        horizontalTilt: 20,
    };
    let locations = [];
    const svg = d3
        .selectAll(".globe")
        .attr("width", width)
        .attr("height", height);
    const markerGroup = svg.append("g");
    const projection = d3.geoOrthographic();
    const initialScale = projection.scale();
    const path = d3.geoPath().projection(projection);
    const center = [width / 2, height / 2];

    drawGlobe();
    // drawOceon();
    drawGraticule();
    enableRotation();

    function drawGlobe() {
        d3.queue()
            .defer(
                d3.json,
                "https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json"
            )
            // .defer(d3.json, "/src/location.json")
            .await((error, worldData, locationData) => {
                svg.selectAll(".segment")
                    .data(
                        topojson.feature(worldData, worldData.objects.countries)
                            .features
                    )
                    .enter()
                    .append("path")
                    .attr("class", "segment")
                    .attr("d", path)
                    .style("stroke", "#888")
                    .style("stroke-width", "1px")
                    .style("fill", "#123763")
                    .style("opacity", ".9");

                // locations = locationData;
                // drawMarkers();
            });
    }

    function drawOceon() {
        d3.queue()
            .defer(
                d3.json,
                "https://gist.githubusercontent.com/jrrickard/8755532505a40f3b8317/raw/ecd98849d3a5f4502b773b986254f19af3b8d8fb/oceans.topo.json"
            )
            // .defer(d3.json, "/src/location.json")
            .await((error, oceonData, locationData) => {
                svg.selectAll(".segment-2")
                    .data(
                        topojson.feature(oceonData, oceonData.objects.oceans)
                            .features
                    )
                    .enter()
                    .append("path")
                    .attr("class", "segment-2")
                    .attr("d", path)
                    .style("stroke", "#888")
                    .style("stroke-width", "0px")
                    .style("fill", "blue")
                    .style("opacity", "1");

                // locations = locationData;
                // drawMarkers();
            });
    }

    function drawGraticule() {
        const graticule = d3.geoGraticule().step(0, 0);

        svg.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path)
            .style("fill", "red")
            .style("stroke", "red");
    }

    function enableRotation() {
        d3.timer(function (elapsed) {
            projection.rotate([
                config.speed * elapsed - 100,
                config.verticalTilt,
                config.horizontalTilt,
            ]);
            svg.selectAll("path").attr("d", path);
            // drawMarkers();
        });
    }

    function drawMarkers() {
        const markers = markerGroup.selectAll("circle").data(locations);
        markers
            .enter()
            .append("circle")
            .merge(markers)
            .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
            .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
            .attr("fill", (d) => {
                const coordinate = [d.longitude, d.latitude];
                let gdistance = d3.geoDistance(
                    coordinate,
                    projection.invert(center)
                );
                return gdistance > 1.57 ? "none" : "steelblue";
            })
            .attr("r", 7);

        markerGroup.each(function () {
            this.parentNode.appendChild(this);
        });
    }
}
