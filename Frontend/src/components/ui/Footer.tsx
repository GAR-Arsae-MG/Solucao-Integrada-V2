

import ArsaeLogo from '../../assets/Arsae-MG-_-logo_med.png'
import { Linkedin, Airplay, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <div>
        <footer className='bg-slate-900'>
            <div className='container p-6 mx-auto'>
                <div className='lg:flex'>
                    <div className='w-full -mx-6 lg:w-2/5'>
                        <div className='px-6'>
                            <a href="/">
                                <img src={ArsaeLogo} alt="Logo" className='w-auto h-10' />
                            </a>

                            <p className='max-w-sm mt-2 text-gray-400'>Agência Reguladora Transparente e Sustentável</p>

                            <div className='flex mt-6 -mx-2'>
                                <a 
                                    href="https://www.arsae.mg.gov.br" 
                                    className='mx-2 text-black transition-colors duration-300 hover:text-blue-600'
                                >
                                    <Airplay className='w-auto h-8' />
                                </a>

                                <a href="https://www.linkedin.com/company/arsaemg/">
                                    <Linkedin className='mx-2 text-black transition-colors duration-300 hover:text-blue-600' />
                                </a>

                                <a href="https://www.instagram.com/arsaemg/">
                                    <Instagram className='mx-2 text-black transition-colors duration-300 hover:text-blue-600'/>
                                </a>

                                <a href="https://www.facebook.com/arsaemg">
                                    <Facebook className='mx-2 text-black transition-colors duration-300 hover:text-blue-600'/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 lg:mt-0 lg:flex-1'>
                        <div className='grid grid-cols-1 gap6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            <div>
                                <h3 className='text-white uppercase'>Sobre</h3>

                                <a href="https://www.arsae.mg.gov.br/sobre/" className='block mt-2 text-sm text-gray-400 hover:underline'>A Arsae</a>
                                <a href="/SobreProjeto" className='block mt-2 text-sm text-gray-400 hover:underline'>O Projeto</a>
                            </div>

                            <div>
                                <h3 className='text-white uppercase'>Normas</h3>

                                <a href="https://www.arsae.mg.gov.br/wp-content/uploads/2022/06/2.-Politica-Anticorrupcao_-cartilha-1.pdf" className='block mt-2 text-sm text-gray-400 hover:underline'>Política Anticorrupção</a>
                                <a href="https://www.arsae.mg.gov.br/wp-content/uploads/2022/10/Plano-de-Compliance-Integridade-1.pdf" className='block mt-2 text-sm text-gray-400 hover:underline'>Compliance</a>
                            </div>

                            <div>
                                <h3 className='text-white uppercase'>Contato</h3>

                                <a href="https://www.arsae.mg.gov.br/quem-e-quem/" className='block mt-2 text-sm text-gray-400 hover:underline'>Telefones de Contato</a>

                                <span className='block mt-2 text-sm text-gray-400'>Horário de Funcionamento:</span>
                                <span className='block mt-2 text-sm text-gray-400'>Segunda a Sexta: 8h às 18h</span><span className='block mt-2 text-sm text-gray-400'></span>
                            </div>

                            <div>
                                <h3 className='text-white uppercase'>Localização</h3>

                                <span className='block mt-2 text-sm text-gray-400'>Rodovia Papa João Paulo II, 4.001 | Prédio Gerais, 2º andar</span>
                                <span className='block mt-2 text-sm text-gray-400'>Bairro Serra Verde – BH - MG | CEP: 31630-901</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='h-px my-6 bg-gray-700 border-none' />

                <div>
                    <p className='text-center text-gray-400'>© Arsae 2009 - {new Date().getFullYear()} - Todos os direitos reservados</p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer