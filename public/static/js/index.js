async function embedText(file, location) {
    try {
        const response = await fetch(file);

        const text = await response.text();

        document.getElementById(location).innerText = text;
    } catch (error) {
        console.error("Error loading the file:", error);
        document.getElementById(location).innerText = "Failed to load content.";
    }
}

async function embedList(file, location) {
    try {
        const response = await fetch(file);

        const text = await response.text();

        const items = text.split("\n");

        const itemsMap = items.map(item => {
            const split = item.split(" - ");
            return split;
        })

        let listItems = "";

        itemsMap.forEach(item => {
            listItems += "<li class='mb-2'>" +
                "<div class='text-2xl font-bold'>" + titleCase(item[0]) + "</div>" +
                item[1] +
                "</li>";
        })

        document.getElementById(location).innerHTML = listItems;
    } catch (error) {
        console.error("Error loading the file:", error);
        document.getElementById(location).innerText = "Failed to load content.";
    }
}

function titleCase(s) {
    return s.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

embedList('public/services.txt', 'services-list');
embedText('public/description.txt', 'business-description');