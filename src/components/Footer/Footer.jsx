import './footer.css'

function Footer() {
    return (
        <footer>

            <div class="footer-container">

                <div class="logo-footer"><img src="/assets/images/logo-big.png" alt="" /> </div>

                <div class="adress-footer">
                    <h4 class="adress-titulo">Endereço:</h4>
                    <p>Rua da República, 801</p>
                    <p>Cidade Baixa</p>
                    <p>Porto Alegre / RS</p>
                    <p>CEP 90050-321</p>
                </div>

                <div class="adress-footer">
                    <h4 class="adress-titulo">Contatos:</h4>
                    <p>de segunda à sexta das 8h às 12h e das 13h às 17h20min.</p>
                    <p>(51) 3433.6900 | (51) 3433.6902 </p>
                    <p>relacaoinstitucional@paodospobres.com.br</p>
                </div>

                <div class="adress-footer">
                    <h4 class="adress-titulo">Envie seu currículo:</h4>
                    <p><a href="https://paodospobres.kretos.cc/">Acesse aqui:</a></p>
                    <p>Seja um voluntário:</p>
                    <p>voluntarios@paodospobres.com.br</p>
                </div>



            </div>

            <p class="copyright">Copyright © 2026 - Wilgner Guimarães</p>

        </footer>
    )
}

export default Footer