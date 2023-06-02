import styled from "styled-components";
export default function Footer() {
  return (
    <FooterStyle>
      <section>
        <div className="Title">
          <h1>Footer</h1>
        </div>
        <div className="">
          <div className="">
            <h3>test</h3>
            <ul>
              <li>menu1</li>
              <li>menu1</li>
              <li>menu1</li>
            </ul>
          </div>
          <div>
            <h3>test</h3>
            <ul>
              <li>menu1</li>
              <li>menu1</li>
              <li>menu1</li>
            </ul>
          </div>
          <div>
            <h3>test</h3>
            <ul>
              <li>menu1</li>
              <li>menu1</li>
              <li>menu1</li>
            </ul>
          </div>
        </div>
      </section>
    </FooterStyle>
  );
}
const FooterStyle = styled.footer`
  display: flex;
  justify-content: center;
  background-color: #000;
  color: #fff;
  > section {
    width: 80%;
    max-width: 1000px;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
    outline: 2px solid coral;
    // Left Box
    > div {
      padding: 1rem;
      outline: 2px solid green;
      > div {
        padding: 1rem;
        outline: 2px solid green;
      }
    }
    // Right Box
    > div:nth-of-type(2) {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      > div {
        min-width: 10rem;
      }
    }
    @media (width<1000px) {
      width: 100%;
    }
    @media (width<750px) {
      > div:nth-of-type(2) {
        flex-direction: column;
        align-items: flex-end;
      }
    }
    @media (width<400px) {
      flex-direction: column;
      > div:nth-of-type(2) {
        align-items: stretch;
      }
    }
  }
`;
