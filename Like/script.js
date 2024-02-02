let likeButtons = document.querySelectorAll(".like-button");
var liked = false;

likeButtons.forEach(likeButton => {
    likeButton.addEventListener("click", () => {
        let imgElement = likeButton.querySelector("img");

        if (!liked) {
            imgElement.src = "./filled_heart.png";
            liked = true;
        } else {
            imgElement.src = "./heart.png";
            liked = false;
        }
    });
});
