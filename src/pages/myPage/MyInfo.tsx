import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '@/hooks';
import { auth, storage } from '@/firebaseApp';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import Profile from '@/assets/images/profile.png';
import './myInfo.scss';

const MyInfo = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(user?.displayName);
  const [password, setPassword] = useState('');
  const [uploadedImg, setUploadedImg] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadedImg(String(reader.result));
    };
    uploadImg(file);
  };

  const uploadImg = async (file: File) => {
    const storagePath = `profile_images/${file.name}`;
    const storageRef = ref(storage, storagePath);
    const stoageSnapshot = await uploadBytes(storageRef, file);
    setImgUrl(await getDownloadURL(stoageSnapshot.ref));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!user?.email || !auth.currentUser) throw Error();
      user.emailVerified ||
        (await signInWithEmailAndPassword(auth, user.email, password));
      await updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: imgUrl,
      });
      alert('회원정보 수정에 성공했습니다.');
      navigate('/mypage');
    } catch {
      alert('회원정보 수정에 실패했습니다.');
    }
  };

  return (
    <div className="my_info_page">
      <HeaderBefore ex={false} title="내 정보" />
      <main className="my_info_container inner">
        <section className="profile_section">
          <div className="profile">
            <img src={uploadedImg || user?.photoURL || Profile} alt="profile" />
            <label htmlFor="profile" className="edit_btn" />
            <input
              onChange={handleChange}
              id="profile"
              type="file"
              accept="image/*"
            />
          </div>
        </section>
        <section className="input_section">
          <ul>
            <li>
              <label>이메일</label>
              <input type="text" placeholder={user?.email || ''} readOnly />
            </li>
            <li>
              <label>닉네임</label>
              <input
                onChange={e => setNickname(e.target.value)}
                type="text"
                defaultValue={user?.displayName || ''}
              />
            </li>
            {user?.emailVerified || (
              <li>
                <label>비밀번호 확인</label>
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </li>
            )}
          </ul>
        </section>
      </main>
      <button className="info_post" onClick={handleClick}>
        저장
      </button>
    </div>
  );
};

export default MyInfo;
