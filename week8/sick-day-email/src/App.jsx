import './App.css'
import EmailHeader from './EmailHeader'
import EmailFooter from './EmailFooter';
import Paragraph1 from './Paragraph1';
import Paragraph2 from './Paragraph2';
import Paragraph3 from './Paragraph3';
import Paragraph4 from './Paragraph4';
import Paragraph5 from './Paragraph5';
import ContainerCard from './ContainerCard';


function App() {
const dateGen = () => {
  return new Date().toISOString();
}
  const name1 = "Ben";
  const name2 = "Not Ben";
  return (

<>

<h4>Email Letter</h4>
    <ContainerCard cls="container" >
      <EmailHeader sender={name1} cls="header" />
      <Paragraph1 cls="p1" />
      <Paragraph2 cls="p2" />
      <Paragraph3 cls="p3" func={dateGen}/>
      <Paragraph4 cls="p4" />
      <Paragraph5 cls="p5" />
      <EmailFooter reciever={name2} cls="foot"/>
    </ContainerCard>
</>

  )
}

export default App
