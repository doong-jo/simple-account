const Error404 = {
    render: async () => {
        const view = `
            <section class="section">
                <h1> 찾을 수 없는 페이지입니다. </h1>
            </section>
        `;
        return view;
    },

    afterRender: async () => {},
};

export default Error404;
