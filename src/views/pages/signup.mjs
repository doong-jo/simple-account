import Util from '../../services/util.mjs';

const Signup = {
    render : async () => {
        Util.appendCSS('signup');

        let view =  `
            <section class="section">
                <h1> 회원가입 </h1>
            </section>
        `
        return view;
    },

    after_render: async () => {
        
    }
}

export default Signup;