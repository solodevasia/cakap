import { createReducer, on } from '@ngrx/store';
import { clearCourseDetail, fetchCourse, fetchCourseDetail, fetchCourseWithKeyword, resetCourses } from '../actions/course.actions';

export interface CoursesState {
  productType: string;
  id: number;
  forKids: boolean;
  title: string;
  topic: string;
  promoText: string;
  startTime: unknown;
  endTime: unknown;
  placementTest: null;
  classImage: string;
  dateOnUi: unknown;
  tutors: {
    name: string;
    profileImage: string;
    qiscusId: unknown;
    email: unknown;
  };
  price: {
    oldPrice: string;
    newPrice: string;
  };
  nextAction: {
    deeplink: string;
  };
  category: {
    id: number;
    name: string;
    icon: string;
  };
  appleProductId: unknown;
  webinarVideo: unknown;
  videoUrl: unknown;
  statusVideo: unknown;
  slotInfo: unknown;
  avgRating: number;
  powerRating: number;
  totalSales: number;
  reviews: {
    rating: number;
    total: number;
  };
  skillBadges: unknown[];
}

export interface CourseDetailState {
  courseId?: number;
  courseName?: string;
  basicPrice?: unknown;
  discount?: unknown;
  discountType?: unknown;
  finalPrice?: number;
  priceCrossedOut?: unknown;
  label?: unknown;
  categoriesId?: number;
  categoriesName?: string;
  rating?: number;
  icon?: {
    large?: string;
    small?: string;
    thumbnail?: string;
    square?: string;
  };
  partner?: {
    partnerId?: number;
    partnerName?: string;
    partnerLogo?: {
      large?: string;
      small?: string;
      thumbnail?: string;
      square?: string;
    };
    partnerAddress?: unknown;
    partnerCode?: unknown;
    partnerDescription?: string;
    orderNumber?: number;
    flagActive?: string;
    courseCategories?: unknown;
    paymentLink?: string;
    partnerType?: string;
    isLivePaymentReport?: false;
    contactLink?: {
      email?: string;
      facebook?: string;
      instagram?: string;
      twitter?: string;
      whatsapp?: string;
    };
    isB2b?: string;
    adminPartnerMultilangList?: unknown[];
    tenantCode?: string;
  };
  courseDescription?: {
    aboutCourse?: string;
    curriculum?: string;
    schedule?: string;
    facilities?: string;
    termAndCondition?: string;
    howToRedeem?: string;
  };
  hasBuyThisCourse?: string;
  isUseOurLms?: boolean;
  isSupportPrakerja?: boolean;
  enableFastForward?: boolean;
  isEnableCertificate?: boolean;
  tutorName?: unknown;
  tutorDesc?: unknown;
  tutorPhoto?: unknown;
  projectDescription?: unknown;
  buyPartnerUrl?: unknown;
  externalUrl?: string;
  isBnspSupport?: boolean;
  courseType?: string;
  pinPoint?: {
    offlineLocationName?: unknown;
    offlineLatitude?: unknown;
    offlineLongitude?: unknown;
    offlineAddress?: unknown;
    masterLocationId?: unknown;
  };
  isAsyncCourse?: boolean;
  courseBatches?: unknown;
  voucherCode?: unknown;
  autoApplyVoucher?: {
    id?: unknown;
    code?: unknown;
  };
  isEnroll?: boolean;
  courseStudent?: unknown;
  isSalesDiscount?: boolean;
  tncContent?: string;
  tags?: [];
  isBundledProduct?: boolean;
  deadline?: unknown;
  isExpired?: boolean;
  isEnrollmentAvailable?: boolean;
  deeplinkIAP?: string;
  iosPrice?: {
    id?: number;
    priceIdr?: number;
    priceAfterTaxIdr?: number;
    appleProductId?: string;
  };
  isCourseForKids?: boolean;
  courseAssessmentLevel?: unknown;
  courseAssessmentLevelId?: unknown;
  isPlacementTest?: boolean;
  certificateBenefit?: {
    coa?: boolean;
    coc?: true;
  };
  skillBadges?: [];
  b2BCourse?: boolean;
}

export interface CourseState {
  id: number;
  courses: CoursesState[];
  information?: unknown;
  partners?: unknown[];
  status?: string;
  page: number;
  totalElement?: number;
  totalPage: number;
  totalRecords?: number;
  keyword: string;
  courseDetail: CourseDetailState
}

export interface CourseSelectorState {
  course: CourseState
}

const initialState: CourseState = {
  id: 0,
  courses: [],
  page: 1,
  totalPage: 15,
  keyword: '',
  courseDetail: {}
};

export const CourseStore = createReducer(
  initialState,
  on(fetchCourse, (state, {course}) => {
    return {...state, ...course, totalPage: 15}
  }),
  on(fetchCourseDetail,(state, {courseDetail}) => {
    const basicPrice = `Rp${new Intl.NumberFormat('id', {style: 'currency', currency: 'IDR'}).format(Number(courseDetail.basicPrice || 0)).replace(',00','').replace("Rp",'').trim()}`
    return {...state, courseDetail: {...courseDetail, basicPrice}}
  }),
  on(resetCourses, (state) => ({...state, courses: [], page: 1, totalPage: 15 })),
  on(fetchCourseWithKeyword, (state, payload) => {
    return {...state, ...payload.course, keyword: payload.keyword}
  }),
  on(clearCourseDetail, (state) => ({...state, courseDetail: {}}))
);
