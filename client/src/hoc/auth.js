import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';


const Auth = (SpecificComponent, option, adminRoute = null) => {

    //null =>아무나 출입이 가능한 페이지
    //true  =>로그인한 유저만 출입이 가능한 페이지
    //false =>로그인한  유저는 출입 불가능한 페이지

    function AuthenticaitonCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(res => {
                console.log(res);
            })

        }, []);

        return <SpecificComponent />
    }

    return AuthenticaitonCheck;
};

export default Auth;