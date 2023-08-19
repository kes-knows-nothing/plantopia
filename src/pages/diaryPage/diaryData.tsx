import img1 from '@/assets/images/diary_sample1.jpg';
import img2 from '@/assets/images/diary_sample2.jpg';
import img3 from '@/assets/images/diary_sample3.jpg';
import img4 from '@/assets/images/diary_sample4.jpg';

const diaryData = [
    {
        diaryId: 10,
        title: '새 잎이 자랐다.',
        content: '플래피노에 꽃이 피었다. 요즘 날씨가 좋아서 쑥쑥 자라더니 어느새 꽃 봉우리가 활짝 펴졌다. 향이 좋아서 자꾸 더 들여다보게 된다. 앞으로 다른 꽃들도 더 많이 활짝 피었으면 좋겠다!',
        imgUrl: [img1, img2, img3, img4],
        postedAt: '2023.08.19',
        nickname: ['플래피노'],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 9,
        title: '치치와 자스민 분갈이 준비 완료',
        content: '미루고 미뤘던 분갈이 준비를 마쳤다. 이제 곧 작업 시작 예정!!',
        imgUrl: [img2],
        postedAt: '2023.08.18',
        nickname: ['치치', '자스민공주'],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 8,
        title: '햇살이 좋은 날에는 사랑초와 함께',
        content: '오늘은 햇살이 따사롭고 좋은 날이었다. 사랑초를 창가로 옮겨놓고 즐거운 시간을 보냈다.',
        imgUrl: [],
        postedAt: '2023.08.15',
        nickname: ['사랑초'],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 7,
        title: '블루라벤더가 향기로운 계절',
        content: '여름이 가고 가을이 오면 블루라벤더의 향기가 더욱 돋보인다. 이 시기에 이 곳에 피어나는 꽃들이 향기롭고 아름답다.',
        imgUrl: [img4, img1],
        postedAt: '2023.08.10',
        nickname: ['블루라벤더'],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 6,
        title: '하트호야의 성장일기',
        content: '하트호야가 한 송이의 꽃을 피웠다. 작은 꽃이지만 내 마음에는 큰 행복을 선물해주었다.',
        imgUrl: [img2],
        postedAt: '2023.08.08',
        nickname: ['하트호야'],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 5,
        title: '스뚜끼의 모습이 달라졌어요',
        content: '스뚜끼가 조금 더 커져서 더욱 활기차보인다. 뿌리가 더욱 굵어져서 건강해보인다.',
        imgUrl: [img3],
        postedAt: '2023.08.06',
        nickname: ['스뚜끼'],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 4,
        title: '치치의 꽃을 기다리며',
        content: '치치의 꽃이 언제 피어날까 기다리며 창가에서 시간을 보냈다. 아직 꽃이 피지는 않았지만 곧 꽃이 피어날 거라 믿는다.',
        imgUrl: [],
        postedAt: '2023.08.04',
        nickname: [],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 3,
        title: '자스민공주의 우아한 꽃',
        content: '자스민공주의 꽃이 피어났다. 향기로운 꽃들이 방 안을 채워서 기분이 좋아졌다. 앞으로 더욱 더 꽃들이 번지기를 기대해본다.',
        imgUrl: [],
        postedAt: '2023.08.03',
        nickname: ['자스민공주'],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 2,
        title: '식물들을 돌보는 즐거운 하루',
        content: '오늘은 식물들을 물주고 옮겨 심는 등의 작업을 했다. 식물들이 건강하게 자라고 있는 모습을 보니 기분이 좋아진다.',
        imgUrl: [img4,img3,img2,img1],
        postedAt: '2023.08.02',
        nickname: ['플래피노', '치치', '자스민공주', '하트호야', '사랑초', '블루라벤더', '스뚜끼', '이름이긴어떤식물'],
        userEmail: 'user1@gmail.com'
    },
    {
        diaryId: 1,
        title: '매일 새로운 변화를 발견하는 기쁨',
        content: '내 식물 친구들과 함께 시간을 보내는 건 언제나 기분 좋다. 하루종일 바쁘게 일하고 난 뒤에도 식물들을 보면 마음이 편안해진다.',
        imgUrl: [img2,img3,img1],
        postedAt: '2023.08.01',
        nickname: ['플래피노', '치치', '자스민공주', '하트호야', '사랑초', '블루라벤더', '스뚜끼', '이름이긴어떤식물'],
        userEmail: 'user1@gmail.com'
    },
];

export default diaryData;