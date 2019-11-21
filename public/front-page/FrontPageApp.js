import Component from '../Component.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import Loading from '../common/Loading.js';
import FrontPageList from './FrontPageList.js';
import { getFrontPage, addFavorite } from '../services/domain-api.js';

// document.addEventListener('DOMContentLoaded', function(event) {
//     // DOM fully loaded and parsed

//     function stackedCards() {
//         // Our code will go here
//     }

//     stackedCards();
// });

class FrontPageApp extends Component {

    async onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const main = dom.querySelector('main');
        const publisherList = dom.querySelector('#publisher-list');

        const frontPageList = new FrontPageList({
            frontPageItems: [],
            onFavorite: async newFavorite => {
                try {
                    await addFavorite(newFavorite);

                } catch (err) {
                    console.log(err);
                }
            }
        });
        main.appendChild(frontPageList.renderDOM());
        // initial todo load:
        try {
            // window.location = window.location + '#';
            // let url = new URL(window.location);
            
            const frontPageItems = await getFrontPage();
            console.log(frontPageItems);
            this.state.frontPageItems = frontPageItems;
            frontPageList.update({ frontPageItems });

            let publishers = frontPageItems.reduce((acc, curr) => {
                if (!acc.includes(curr.source.id)){
                    acc.push(curr.source.id);
                }
                return acc;
            }, []);
            publishers = publishers.sort();
            publishers.forEach(publisher => {
                let publisherSpan = document.createElement('span');
                publisherSpan.textContent = publisher;

                const publisherCheckbox = document.createElement('input');
                publisherCheckbox.type = 'checkbox';
                publisherCheckbox.value = publisher;
                publisherSpan.appendChild(publisherCheckbox);
                publisherCheckbox.addEventListener('change', event =>{
                    if (this.checked){
                        location.hash += event.target.value + '&';
                    } else {
                        let spliceThisUrl = window.location;
                        const hashLocation = spliceThisUrl.indexOf(event.target.value);
                        spliceThisUrl.splice(hashlocation, );
                    }
                });

                const publisherGap = document.createElement('span');
                publisherGap.textContent = ' ';
                publisherSpan.appendChild(publisherGap);

                console.log(publisherSpan);
                publisherList.appendChild(publisherSpan);
            });


        } catch (err) {
            console.log('Update News List failed\n', err);
        }
        finally {
            loading.update({ loading: false });
        }

        const footer = new Footer();
        main.appendChild(footer.renderDOM());

    }

    renderHTML() {
        return /*html*/ `
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <div id="publisher-list"><div>
                <main class="cards-container">
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default FrontPageApp;
