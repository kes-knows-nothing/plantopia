import axios from 'axios';
import { useEffect } from 'react';

const KaKaoLoginCallback = () => {
  // const signFireBase = firebase.auth();

  const goKakaoAuth = async () => {
    const req_headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grantType = 'authorization_code';
    const REST_API_KEY = `${import.meta.env.VITE_KAKAO_CLIENT_ID}`;
    const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    const response = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      {},
      { headers: req_headers },
    );
    const { access_token } = response.data;
    console.log(response);
    const result = await axios.post(
      `https://kapi.kakao.com/v2/user/me`,
      {},
      { headers: { ...req_headers, Authorization: `Bearer ${access_token}` } },
    );
    console.log(result);
    const { kakao_account, properties } = result.data;
    console.log();
  };
  useEffect(() => {
    goKakaoAuth();

    // const params = new URL(document.location.toString()).searchParams;
    // const code = params.get('code');
    // const grantType = 'authorization_code';
    // const REST_API_KEY = `${import.meta.env.VITE_KAKAO_CLIENT_ID}`;
    // const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    // axios
    //   .post(
    //     `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    //     {},
    //     {
    //       headers: {
    //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //       },
    //     },
    //   )
    //   .then((res: any) => {
    //     console.log(res);
    //     const { access_token } = res.data;
    //     axios
    //       .post(
    //         `https://kapi.kakao.com/v2/user/me`,
    //         {},
    //         {
    //           headers: {
    //             Authorization: `Bearer ${access_token}`,
    //             'Content-type':
    //               'application/x-www-form-urlencoded;charset=utf-8',
    //           },
    //         },
    //       )
    //       .then((res: any) => {
    //         console.log('2번쨰', res);
    //       });
    //   })
    //   .catch((Error: any) => {
    //     console.log(Error);
    //   });
  }, []);

  return <></>;
};
export default KaKaoLoginCallback;
