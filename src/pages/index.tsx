import {NextPage} from "next";
import styled from "@emotion/styled"
import {css} from "@emotion/react"
import Text from "@components/Text";
import Button from "@components/Button";
import AuthGuard from "@components/auth/AuthGuard";
import {RecoilRoot} from "recoil";

const Home: NextPage = () => {
    return (
        <Container>
            <RecoilRoot>
            <AuthGuard>
                <div css={bold}>Hello</div>
                <Text>T1</Text>
                <Button>dddasdasdasdsd</Button>
            </AuthGuard>
            </RecoilRoot>
        </Container>
    )
}

const Container = styled.div`
  background-color: pink;
`
const bold = css`
  font-weight: bold;
`
export default Home
