import { Heliostat, Lightsource, Receiver } from "objects";

export class Overview {
  constructor(editor) {
    this.editor = editor;
    this.selectedItem = null;
    this.overviewButton = document.getElementById("overview-tab");
    this.heliostatList = document.getElementById("heliostatList");
    this.receiverList = document.getElementById("receiverList");
    this.lightsourceList = document.getElementById("lightsourceList");

    this.overviewButton.addEventListener("click", () => {
      this.#render();
    });

    document
      .getElementById("accordionOverview")
      .addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("overviewElem")) {
          if (this.selectedItem) {
            this.selectedItem.classList.toggle("bg-body-secondary");
            this.selectedItem.classList.toggle("bg-primary-subtle");
          }

          this.selectedItem = target;
          // TODO: Set the selected object accordingly

          target.classList.toggle("bg-body-secondary");
          target.classList.toggle("bg-primary-subtle");
        }
      });
  }

  #render() {
    // remove all children
    this.heliostatList.innerHTML = "";
    this.receiverList.innerHTML = "";
    this.lightsourceList.innerHTML = "";

    const objectsInScene = this.editor.getObjects();

    // render the objects
    objectsInScene.forEach((element) => {
      if (element instanceof Heliostat) {
        const heliostatEntry = document.createElement("div");
        heliostatEntry.role = "button";
        heliostatEntry.classList =
          "d-flex gap-2 p-2 bg-body-secondary rounded-2 overviewElem";

        const icon = document.createElement("i");
        icon.classList = "bi-arrow-up-right-square";
        heliostatEntry.appendChild(icon);

        const text = document.createElement("div");
        text.innerHTML = "Heliostat " + element.apiID;
        heliostatEntry.appendChild(text);

        this.heliostatList.appendChild(heliostatEntry);
      }

      if (element instanceof Receiver) {
        const receiverEntry = document.createElement("div");
        receiverEntry.role = "button";
        receiverEntry.classList =
          "d-flex gap-2 p-2 bg-body-secondary rounded-2 overviewElem";

        const icon = document.createElement("i");
        icon.classList = "bi bi-align-bottom";
        receiverEntry.appendChild(icon);

        const text = document.createElement("div");
        text.innerHTML = "Receiver " + element.apiID;
        receiverEntry.appendChild(text);

        this.receiverList.appendChild(receiverEntry);
      }

      if (element instanceof Lightsource) {
        const lightsourceEntry = document.createElement("div");
        lightsourceEntry.role = "button";
        lightsourceEntry.classList =
          "d-flex gap-2 p-2 bg-body-secondary rounded-2 overviewElem";

        const icon = document.createElement("i");
        icon.classList = "bi bi-lightbulb";
        lightsourceEntry.appendChild(icon);

        const text = document.createElement("div");
        text.innerHTML = "Lightsource " + element.apiID;
        lightsourceEntry.appendChild(text);

        this.lightsourceList.appendChild(lightsourceEntry);
      }

      // TODO: If element is selectedElem in Picker --> colour it
    });
  }
}
