import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Stack,
    Image,
  } from '@chakra-ui/react';
  
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
  import LogoSGP from '../../assets/Arsae-MG-_-logo_med.png';
import Pessoa from '../../assets/pessoa.svg'
  
  const Links = [
    ['Painel Principal', '/painel'], 
    ['Cadastro Unidades', '/cadastro_unidades'], 
    ['Cadastro Ativos', '/cadastro_ativos'], 
    ['Listagem', '/listagem_ativos'], 
    ['Usuários', '/listagem_usuarios']
  ];
  
  export default function TopNav() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Box backgroundColor="#1A202C" px={4} pt={1} pb={1}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Abrir Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Image src={LogoSGP} alt="Logo SGP" maxH='60px' />
              <HStack
                as={'nav'}
                spacing={5}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <Link
                    key={link[0]}
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{ textDecoration: 'none', bg: 'gray.200', }}
                    href={link[1]}
                    bg={'#1A202C'}
                    color={'white'}
                    // border='1px'
                    // borderColor='gray.200'
                  >
                    {link[0]}
                  </Link>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Flex flexDirection={'column'}>
                <Box
                  variant={'solid'}
                  color={'white'}
                  size={'2xs'}
                  mr={4}
                >
                  {}
                </Box>
                <Box
                  variant={'solid'}
                  color={'white'}
                  size={'2xs'}
                  mr={4}
                >
                  {}
                </Box>
              </Flex>
              
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'md'}
                    src={Pessoa}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Usuários</MenuItem>
                  <MenuItem>Sair</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <Link
                    key={link[0]}
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: 'gray.200',
                    }}
                    color={'white'}
                    href={link[1]}
                    bg={'#1A202C'}
                    >
                    {link[0]}
                  </Link>
                ))}
              </Stack>
            </Box>
          ) : null}
  
        </Box>
      </>
    );
  }