import img1 from '@/assets/images/diary_sample1.jpg';
import img2 from '@/assets/images/diary_sample2.jpg';
import img3 from '@/assets/images/diary_sample3.jpg';
import img4 from '@/assets/images/diary_sample4.jpg';
import img5 from '@/assets/images/diary_sample5.jpg';
import img6 from '@/assets/images/diary_sample6.jpg';
import img7 from '@/assets/images/diary_sample7.jpg';
import img8 from '@/assets/images/diary_sample8.jpg';
import img9 from '@/assets/images/diary_sample9.jpg';
import img10 from '@/assets/images/diary_sample10.jpg';

const diaryData = [
  {
    diaryId: 30,
    title: '사랑초를 다른 곳으로 옮기기',
    content:
      '사랑초가 자랑스러울 정도로 잘 자라고 있다. 그래서 이제는 집안의 다른 곳으로 옮기기로 했다. 새로운 환경에서도 건강하게 자라길 바래본다.',
    imgUrl: [img3, img5],
    postedAt: '2023.08.16',
    nickname: ['플래피노'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 29,
    title: '하트호야가 새 잎자루를 뿜었다!',
    content:
      '이전부터 시간이 좀 지나면 새 잎자루를 뿜는 하트호야. 또다시 새로운 잎을 보여줬다. 하트모양의 잎이 너무 예뻐서 자꾸 보게된다. 앞으로 더욱 건강하게 자라다오~',
    imgUrl: [img5],
    postedAt: '2023.08.14',
    nickname: ['하트호야'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 28,
    title: '플래피노가 깜빡 잊고 있던 모종 발견!',
    content:
      '예전에 한 식물 가게에서 구매한 모종이 어디에 있는지 깜빡하고 있었다. 하지만 오늘, 창고 청소를 하다가 우연히 발견했다!! 지금 바로 화분에 심어서 싹 티나게 자라기를 바래본다.',
    imgUrl: [img2],
    postedAt: '2023.08.12',
    nickname: ['이름이긴어떤식물'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 27,
    title: '감기 조심! 내 식물들도 모두 함께 조심하자구!',
    content:
      '감기 조심이라는데, 한참을 대비하다가 지금 인플루엔자 예방접종에서 근처 병원에서 예약이 되어 있어서 후딱 예약하고 왔다. 이번에는 식물들도 함께 미세먼지와 감기 조심하기로 한다.',
    imgUrl: [],
    postedAt: '2023.08.10',
    nickname: [],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 26,
    title: '자스민공주의 새로운 열매',
    content:
      '자스민공주에게 새로운 열매가 열렸다. 다음 개월에 우리 집엔 자스민공주 열매로 만든 음식이 참 맛있겠다!',
    imgUrl: [img10],
    postedAt: '2023.08.09',
    nickname: ['자스민공주'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 25,
    title: '블루라벤더가 꽃을 피웠다!',
    content:
      '블루라벤더가 여름말, 다시한번 꽃을 피웠다. 향긋한 향기가 집안을 가득!',
    imgUrl: [img8],
    postedAt: '2023.08.08',
    nickname: ['블루라벤더'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 24,
    title: '치치의 새로운 잎이 크게 자라나기를',
    content:
      '치치의 새로운 잎이 작고 귀엽습니다. 그러나 오랜 기다림 끝에 잎의 크기가 조금씩 커질 것입니다. 이번에는 돌보는 것에 대한 기대감이 더욱 크게 된 것 같습니다.',
    imgUrl: [img1],
    postedAt: '2023.08.07',
    nickname: ['치치'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 23,
    title: '스뚜끼 싹트는 기쁨',
    content:
      '스뚜끼를 키우면서 난 모든 식물들이 약간의 시간 차이가 있듯이, 불안정한 기간이 이어집니다. 그러나 오늘, 새로운 싹들이 솟아오르는 모습을 보고 뿌듯하기도 하네요.',
    imgUrl: [img5],
    postedAt: '2023.08.06',
    nickname: ['스뚜끼'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 22,
    title: '플래피노가 기어 올라오며 자라나는 모습을 본 날',
    content:
      '플래피노가 작은 씨앗에서 이렇게 큰 존재가 될 줄은 꿈에도 몰랐습니다. 그러나 지금은 작은 식물에서 하나의 나무로 자라나는 중입니다. 너무 보기 좋습니다!',
    imgUrl: [],
    postedAt: '2023.08.05',
    nickname: ['플래피노'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 21,
    title: '플래피노의 꽃이 드디어 피었다!',
    content:
      '플래피노에게 긴 기다림 끝에, 한 송이 꽃이 피었습니다. 꽃잎은 예쁘게 펴져있습니다. 기쁨이 넘치는 순간입니다!',
    imgUrl: [img6],
    postedAt: '2023.08.04',
    nickname: ['플래피노'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 20,
    title: '자스민공주가 조금 더 자랐다',
    content:
      '자스민공주가 조금 더 자라고 있다. 아름다운 꽃봉오리를 내뿜으며 자라나기를 바라본다.',
    imgUrl: [img9, img1],
    postedAt: '2023.08.03',
    nickname: ['자스민공주'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 19,
    title: '화분을 더욱 아름답게 꾸미기',
    content:
      '연구실과 집 모두에서 화분을 꾸미기 시작했다. 집에서 화분 꾸미기를 꾸준히 하면서 식물을 돌볼 때 행복을 느끼며 보내고 있다.',
    imgUrl: [img7, img8],
    postedAt: '2023.08.02',
    nickname: ['플래피노', '치치', '사랑초'],
    userEmail: 'test@test.com',
  },
  {
    diaryld: 18,
    title: '병들어있던 스누피!',
    content:
      '어느날 부터 스누피가 병들어 있는 것 같아 집중적으로 관리를 하기 시작했습니다. 얼마전에 비로소 첫 꽃이 피어 뿌듯하기도 합니다. 앞으로도 꾸준한 관리가 필요할 것 같습니다.',
    imgUrl: [img10],
    postedAt: '2023.08.01',
    nickname: ['스뚜끼'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 17,
    title: '더욱 푹신해진 토양',
    content:
      '작은 식물들의 푹신해진 토양이 눈에 띄어 기쁩니다. 식물을 대우하고 챙겨주는 시간이 하루하루 쌓여 가치를 더욱 느끼고 있습니다. 조금 더 열심히 돌보기로 하겠습니다.',
    imgUrl: [img4, img5],
    postedAt: '2023.07.31',
    nickname: [],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 16,
    title: '마트에서 판매중인 식물들...',
    content:
      '마트에 들러 식물 코너를 구경하는 김에 코스모스와 해바라기, 라벤더 등 각 종 꽃들을 구입해 왔습니다. 나름 예쁘게 꾸며진집에 적절한 화분을 찾으러 다다미로 가보겠습니다.',
    imgUrl: [img3, img6],
    postedAt: '2023.07.30',
    nickname: ['이름이긴어떤식물'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 15,
    title: '로즈마리에서 장미 영혼을',
    content:
      '서쪽 창문 여유롭게 자라고 있는 로즈마리에게 장미 영혼을 제공하기로 했습니다. 제가 생각했을 때 로즈마리는 이곳 저곳에 잘 어울릴 것 같은 느낌이었습니다.',
    imgUrl: [img9],
    postedAt: '2023.07.29',
    nickname: ['블루라벤더'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 14,
    title: '봄나물을 농사',
    content:
      '이번엔 봄나물을 심기로 했습니다. 로즈마리와 잘 어울렸으면 좋겠습니다. 올해는 봄의 햇살이 잘 참겠네요. 아무튼, 봄나물 씨앗들, 소중히 다뤄 주기로 했습니다.',
    imgUrl: [img5],
    postedAt: '2023.07.28',
    nickname: ['스뚜끼'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 13,
    title: '영양제를 주기로 했습니다.',
    content:
      '식물 마다 적절한 영양소가 필요한데 제가 준비해서 줄 문제가 아니었습니다. 하지만 얼마전 한 식물 가게에서 파는 따로 만든 영양제를 소개받았습니다. 사용법에 따라 효과를 극대화 시킬 수 있다고 하더라구요. 기대되네요!',
    imgUrl: [img7],
    postedAt: '2023.07.27',
    nickname: ['플래피노'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 12,
    title: '잘못된 식물 관리 팁!',
    content:
      '잘못된 식물 관리 팁을 참고해서 식물에게 해를 끼쳤던 적이 있습니다. 중요한 건 배양 환경에 맞게 제대로 관리하는 것입니다. 참고만하는 것은 위험합니다!',
    imgUrl: [img8],
    postedAt: '2023.07.26',
    nickname: ['사랑초'],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 11,
    title: '초록의 종들, 참 예뻐요',
    content:
      '집안 곳곳에서 새로 나오고 있던 초록들이 참 예뻤습니다. 나무위에, 창문에, 계단 아래, 굴뚝 옆 등 여러 장소에서 성장하며, 도시 생활의 답답한 분위기를 충분히 풀어줍니다. 그 씨앗도, 화분도 다 소중한 것 같아요 :-)',
    imgUrl: [img1, img6, img8],
    postedAt: '2023.07.15',
    nickname: [],
    userEmail: 'test@test.com',
  },
  {
    diaryId: 10,
    title: '새 잎이 자랐다.',
    content:
      '플래피노에 꽃이 피었다. 요즘 날씨가 좋아서 쑥쑥 자라더니 어느새 꽃 봉우리가 활짝 펴졌다. 향이 좋아서 자꾸 더 들여다보게 된다. 앞으로 다른 꽃들도 더 많이 활짝 피었으면 좋겠다!',
    imgUrl: [img3, img3, img4],
    postedAt: '2023.07.01',
    nickname: ['플래피노'],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 9,
    title: '치치와 자스민 분갈이 준비 완료',
    content: '미루고 미뤘던 분갈이 준비를 마쳤다. 이제 곧 작업 시작 예정!!',
    imgUrl: [img2],
    postedAt: '2023.06.25',
    nickname: ['치치', '자스민공주'],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 8,
    title: '햇살이 좋은 날에는 사랑초와 함께',
    content:
      '오늘은 햇살이 따사롭고 좋은 날이었다. 사랑초를 창가로 옮겨놓고 즐거운 시간을 보냈다.',
    imgUrl: [],
    postedAt: '2023.06.20',
    nickname: ['사랑초'],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 7,
    title: '블루라벤더가 향기로운 계절',
    content:
      '여름이 가고 가을이 오면 블루라벤더의 향기가 더욱 돋보인다. 이 시기에 이 곳에 피어나는 꽃들이 향기롭고 아름답다.',
    imgUrl: [img4, img1],
    postedAt: '2023.06.10',
    nickname: ['블루라벤더'],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 6,
    title: '하트호야의 성장일기',
    content:
      '하트호야가 한 송이의 꽃을 피웠다. 작은 꽃이지만 내 마음에는 큰 행복을 선물해주었다.',
    imgUrl: [img6],
    postedAt: '2023.06.08',
    nickname: ['하트호야'],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 5,
    title: '스뚜끼의 모습이 달라졌어요',
    content:
      '스뚜끼가 조금 더 커져서 더욱 활기차보인다. 뿌리가 더욱 굵어져서 건강해보인다.',
    imgUrl: [img3],
    postedAt: '2023.05.06',
    nickname: ['스뚜끼'],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 4,
    title: '치치의 꽃을 기다리며',
    content:
      '치치의 꽃이 언제 피어날까 기다리며 창가에서 시간을 보냈다. 아직 꽃이 피지는 않았지만 곧 꽃이 피어날 거라 믿는다.',
    imgUrl: [],
    postedAt: '2023.05.04',
    nickname: ['치치'],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 3,
    title: '자스민공주의 우아한 꽃',
    content:
      '자스민공주의 꽃이 피어났다. 향기로운 꽃들이 방 안을 채워서 기분이 좋아졌다. 앞으로 더욱 더 꽃들이 번지기를 기대해본다.',
    imgUrl: [],
    postedAt: '2023.05.03',
    nickname: ['자스민공주'],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 2,
    title: '식물들을 돌보는 즐거운 하루',
    content:
      '오늘은 식물들을 물주고 옮겨 심는 등의 작업을 했다. 식물들이 건강하게 자라고 있는 모습을 보니 기분이 좋아진다.',
    imgUrl: [img9, img3, img2, img1],
    postedAt: '2023.05.02',
    nickname: [
      '플래피노',
      '치치',
      '자스민공주',
      '하트호야',
      '사랑초',
      '블루라벤더',
      '스뚜끼',
      '이름이긴어떤식물',
    ],
    userEmail: 'user1@test.com',
  },
  {
    diaryId: 1,
    title: '매일 새로운 변화를 발견하는 기쁨',
    content:
      '내 식물 친구들과 함께 시간을 보내는 건 언제나 기분 좋다. 하루종일 바쁘게 일하고 난 뒤에도 식물들을 보면 마음이 편안해진다.',
    imgUrl: [img2, img3, img1],
    postedAt: '2023.08.01',
    nickname: [
      '플래피노',
      '치치',
      '자스민공주',
      '하트호야',
      '사랑초',
      '블루라벤더',
      '스뚜끼',
      '이름이긴어떤식물',
    ],
    userEmail: 'user1@test.com',
  },
];

export default diaryData;
