import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './component/header'
import Footer from './component/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
  
  <div>
  <Header/>
  <Component {...pageProps} />
  <Footer/>
  </div>
  
  )
}


/* _app.tsx
서버로 요청이 들어왔을때 가장먼저 실해오디는 컴포넌트 모든페이지는 이곳을 통하게 되고 공통 레이아웃을 만들때 사용 글로벌 css 적용

Component : 현재 페이지르 ㄹ의미하며 페이지 변경시 해당 Component는 변경
pageProps:DataFatching 메서드를 이용해 미리 가져온 초기 객체 
이 메서드를 사용하지 않으면 빈 객체 전달

_app.tex , _document.tsx : 두파일은 sever only file 이다
Next.js sever logic에 사용되는 파일이기 때문에 client에서 사용하는 로직 사용불가

*/