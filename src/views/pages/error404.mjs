const Error404 = {
    render : async () => {
        let view =  `
            <section class="section">
                <h1> 찾을 수 없는 페이지입니다. </h1>
            </section>
        `
        return view;
    },

    after_render: async () => {
        
    }
}

export default Error404;