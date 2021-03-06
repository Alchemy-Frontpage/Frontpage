import Component from '../Component.js';

class FrontPageItem extends Component {

    onRender(dom) {
        const frontPageItem = this.props.item;
        const onKeep = this.props.onFavorite;

        dom.addEventListener('swiped-right', function() {
            onKeep(frontPageItem);
            dom.classList.add('keep');

            setTimeout(
                function Remove() {
                    dom.remove();
                },
                500);
        });
        dom.addEventListener('swiped-left', function() {
            dom.classList.add('remove');
            setTimeout(
                function Remove() {
                    dom.remove();
                },
                500);
        });

        const keepButton = dom.querySelector('.keep-button');
        keepButton.addEventListener('click', () => {
            onKeep(frontPageItem);
            dom.classList.add('keep');

            setTimeout(
                function Remove() {
                    dom.remove();
                },
                500);
        });

        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            // onRemove(frontPageItem);
            dom.classList.add('remove');
            setTimeout(
                function Remove() {
                    dom.remove();
                },
                500);
        });


    }

    renderHTML() {
        const frontPageItem = this.props.item;

        return /*html*/ `
            <article class = "card-item">
                <h1 class="headline">${(frontPageItem.title === null) ? '' : frontPageItem.title}</h1>
                <div class="image-container"><img src="${frontPageItem.urlToImage}" onerror="this.src='../assets/jasmin.jpg';"></div>
                <div class="byline">
                    <p class="author">${(frontPageItem.author === null) ? '' : frontPageItem.author}</p>
                    <p class="source">${(frontPageItem.source.name === null) ? '' : frontPageItem.source.name}</p>
                </div>
                <div class="buttons">
                    <button class="remove-button"><i class="fas fa-times"></i>
                    </button>
                    <button class="keep-button"><i class="fas fa-heart"></i></button>
                </div>
            </article>
        `;


    }

}

export default FrontPageItem;
