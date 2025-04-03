export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Trophies Won by Messi and Ronaldo Over the Years",
        },
    },
    maintainAspectRatio: false,
};

export const data = {
    labels: [
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
    ],
    datasets: [
        {
            label: "Messi",
            data: [
                1, 1, 2, 3, 5, 8, 12, 15, 18, 20, 22, 26, 29, 32, 34, 36, 37,
                38, 40, 42,
            ],
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
        {
            label: "Ronaldo",
            data: [
                0, 0, 1, 3, 5, 7, 10, 13, 15, 16, 18, 21, 23, 25, 27, 29, 31,
                33, 35, 37,
            ],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
    ],
};

export const pieData = {
    labels: [
        "Domestic League",
        "Champions League",
        "Domestic Cups",
        "International Matches",
    ],
    datasets: [
        {
            label: "Messi's Goal Distribution",
            data: [50, 30, 10, 10],
            backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
        },
    ],
};