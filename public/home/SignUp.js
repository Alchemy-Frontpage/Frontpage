import Component from '../Component.js';

class SignUp extends Component {

    onRender(dom) {
        const onSignUp = this.props.onSignUp;
        const form = dom.querySelector('form');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
    <fieldset> 
    
    <form class="auth-form standard">
    <p>
            <label for="email">Email</label>
            <input id="email" type="email" name="email" required placeholder="you@somewhere.com">
        </p>
        <p>
            <label for="password">Password</label>
            <input id="password" type="password" name="password" required>
        </p>
        <p>
            <button class="sign-up">Sign Up</button>
        </p>
    </form>
    </fieldset>
        `;
    }
}
export default SignUp;