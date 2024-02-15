import {IconArrowUp} from '@tabler/icons-react'
import {useWindowScroll} from '@mantine/hooks'
import {Affix, Button, Transition, rem} from '@mantine/core'
import {useState} from 'react'

const AffixComponent = () => {
  const [scroll, scrollTo] = useWindowScroll()
  const [variant, setVariant] = useState('light')
  return (
    <>
      <style>{`
.mantine-Button-root:hover {
    background-color: rgb(34, 139, 230);
}
.mantine-Button-root {
  background-color: #87bfef;
}
.mantine-Button-root:hover .mantine-Button-label{
  color:white;
}
`}</style>
      <Affix position={{bottom: rem(20), right: rem(20)}}>
        <Transition transition='slide-up' mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              style={transitionStyles}
              radius={7}
              p={0}
              h={40}
              w={40}
              onClick={() => scrollTo({y: 0})}
            >
              <IconArrowUp size='1.4rem' />
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  )
}

export default AffixComponent
