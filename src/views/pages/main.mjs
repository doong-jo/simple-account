import Util from '../../services/util.mjs';

const Main = {
    // https://connect.or.kr/ 의 배경 영상 이용
    render: async () => {
        Util.appendCSS('main');

        let view = `
        <section class="video_container">
            <header>
                <div></div>
                <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                    <source src="https://connect.or.kr/connectfoundation_/video/home_bg.mp4" type="video/mp4" poster="resources/img/bg_home@p.jpg">
                </video>

                <div class="container h-100; text-white">
                    <div class="form-signin">
                        <form action="login" method="">
                            <h1 class="h3 mb-3 font-weight-normal">awesome-todo</h1>
                            <label for="inputEmail" class="sr-only">이메일</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="이메일" required="" autofocus="">
                            <label for="inputPassword" class="sr-only">비밀번호</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="비밀번호" required="">
                            <div class="mb-3"></div>
                            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        </form>
                        <a href="signup">
                            <button class="mt-2 btn btn-lg btn-secondary btn-block">Sign up</button>
                        </a>
                    </div>
                </div>
            </header>
        </section>
        `;
        
        return view;
    },

    after_render: async () => {

    }
};

export default Main;
