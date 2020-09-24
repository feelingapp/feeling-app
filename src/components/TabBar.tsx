import Link from "next/link"
import { styled } from "linaria/react"
import { useRouter } from "next/router"

const Container = styled.nav`
  width: 100%;
  display: grid;
  grid:
    ".     fab .    " 5.6rem
    "tab-1 fab tab-2" min-content
    / 1fr auto 1fr;
  position: fixed;
  bottom: 0;
`

const Background = styled.svg`
  grid-row: 2;
  grid-column: -1 / 1;
  display: block;
  width: 100%;
  height: 6.8rem;
  fill: var(--background-color);
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.1));
`

export const Tab = styled.a<{ active: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.active ? "inherit" : "var(--grey-color)")};
  font-weight: ${(props) => (props.active ? 500 : 400)};
  z-index: 1;
  padding: var(--space-xs);

  svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: currentColor;
  }
`

const TabLabel = styled.p`
  margin-top: var(--space-xxxs);
  font-size: 1.4rem;
  line-height: 1.6rem;
  user-select: none;
`

const FloatingActionButton = styled.div`
  grid-column: -1 / 1;
  grid-row: -1 / 1;
  z-index: 1;
  padding: var(--space-s);
  background: var(--yellow-color);
  align-self: start;
  justify-self: center;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`

export default function TabBar(): JSX.Element {
  const { pathname } = useRouter()

  return (
    <Container>
      <Link href="/me" passHref>
        <Tab active={pathname === "/me"} style={{ gridArea: "tab-1" }}>
          <img src={require("../assets/icons/me.svg")} alt="Me tab" />
          <TabLabel>Me</TabLabel>
        </Tab>
      </Link>

      <Link href="/insights" passHref>
        <Tab active={pathname === "/insights"} style={{ gridArea: "tab-2" }}>
          <img
            src={require("../assets/icons/insights.svg")}
            alt="Insights tab"
          />
          <TabLabel>Insights</TabLabel>
        </Tab>
      </Link>

      <FloatingActionButton>
        <img src={require("../assets/emojis/upset.svg")} alt="Emoji" />
      </FloatingActionButton>

      <Background>
        <defs>
          <mask id="fab-cutout">
            <rect
              x="0"
              y="0"
              style={{ width: "100vw", height: "7.2rem", fill: "white" }}
            />
            <circle cx="50%" cy="-2rem" r="4rem" fill="black" />
          </mask>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" mask="url(#fab-cutout)" />
      </Background>
    </Container>
  )
}
