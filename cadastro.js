window.onload = function(){
    let botaocadastro = document.getElementById("botaoCadastro")
    let botaosaque = document.getElementById("saque")
    let botaodeposito = document.getElementById("deposito")
    let botaoextrato = document.getElementById("extrato")
    var pessoa_Fisica
    var pessoa_Juridica

    botaocadastro.onclick = function(){ //Ação Botao Cadastro
        setTimeout(() => {document.getElementById("erroCadastro").innerHTML = ""},5000);
        let usersaldoInicial = 0
        let recebeNome = document.getElementById("nomeinput").value
        let recebeEndereco = document.getElementById("enderecoinput").value
        let numeroCadastro = parseInt(Math.random()*99999)
        let hora = new Date()
        let horaCadastro = hora.getDate()+"/"+hora.getMonth()+"/"+hora.getFullYear()+"   "+hora.getHours()+":"+hora.getMinutes()+":"+hora.getSeconds()
        if(recebeNome == ""){
            document.getElementById("erroCadastro").innerHTML ="O campo NOME é obrigatório !" 
        }
        else if(recebeEndereco == ""){
            document.getElementById("erroCadastro").innerHTML ="O campo ENDEREÇO é obrigatório !"
        }
        else{
            //VALIDAÇÃO TIPO DE PESSOA
            if(document.getElementById("PF").checked){ //CASO PESSOA FISICA
                let tipoPessoa = "Pessoa Fisica"
                let recebeCPF = document.getElementById("cpfinput").value
                let recebeNascimento= document.getElementById("nascimentoinput").value
                if(recebeCPF == "" || recebeCPF.length != 11){
                    document.getElementById("erroCadastro").innerHTML ="O campo CPF é obrigatório e deve conter 11 digitos !"
                    return
                }
                if(recebeNascimento == "" || recebeNascimento == Date.now()){
                    document.getElementById("erroCadastro").innerHTML ="O campo DATA DE NASCIMENTO é obrigatório !"
                    return
                }
                if(recebeNome,recebeEndereco,recebeCPF,recebeNascimento != ""){
                    pessoa_Fisica = new PessoaFisica(recebeNome,recebeEndereco,recebeCPF,recebeNascimento,numeroCadastro,tipoPessoa,horaCadastro,usersaldoInicial)
                    document.getElementById("sucessoCadastro").innerHTML = "Parabens "+ recebeNome + " seu cadastro foi realizado com sucesso !"
                    document.getElementById("detalhesdaconta").innerHTML = pessoa_Fisica.imprimir()
                    setTimeout(() => {document.getElementById("sucessoCadastro").innerHTML = ""},5000);
                }  
            }
            else if(document.getElementById("PJ").checked){ //CASO PESSOA JURIDICA
                let tipoPessoa = "Pessoa Juridica"
                let recebeCNPJ = document.getElementById("cnpjinput").value
                let recebeSocial = document.getElementById("socialinput").value
                if(recebeCNPJ == "" || recebeCNPJ.length != 14){
                    document.getElementById("erroCadastro").innerHTML ="O campo CNPJ é obrigatório e deve conter 14 digitos !"
                    return
                }
                if(recebeSocial == ""){
                    document.getElementById("erroCadastro").innerHTML ="O campo RAZÃO SOCIAL é obrigatório !"
                    return
                }
                if(recebeNome,recebeEndereco,recebeCNPJ,recebeSocial != ""){
                    pessoa_Juridica = new PessoaJuridica(recebeNome,recebeEndereco,recebeCNPJ,recebeSocial,numeroCadastro,tipoPessoa,horaCadastro,usersaldoInicial)
                    document.getElementById("sucessoCadastro").innerHTML = "Parabens "+ recebeNome + " seu cadastro foi realizado com sucesso !"
                    document.getElementById("detalhesdaconta").innerHTML = pessoa_Juridica
                    setTimeout(() => {document.getElementById("sucessoCadastro").innerHTML = ""},5000);
                }
            }
            else if(document.getElementById("PJ").checked == false && document.getElementById("PF").checked ==false){   //CASO NENHUM TIPO DE PESSOA SELECIONADO
                document.getElementById("erroCadastro").innerHTML ="Por gentileza, escolha entre Pessoa Fisica ou Pessoa Juridica"
            }   
        }
        return
    }
    botaosaque.onclick = function(){ //Ação Botão Saque
        if(document.getElementById("PF").checked){
            pessoa_Fisica.sacar()
            document.getElementById("detalhesdaconta").innerHTML = pessoa_Fisica.imprimir()
        }
        else if(document.getElementById("PJ").checked){
            pessoa_Juridica.sacar()
            document.getElementById("detalhesdaconta").innerHTML = pessoa_Juridica.imprimir()
        }
        else{
            document.getElementById("erroCadastro").innerHTML ="Antes de sacar, cadastre sua conta !"
            setTimeout(() => {document.getElementById("erroCadastro").innerHTML = ""},5000);
        }
        setTimeout(() => {document.getElementById("sucessoCadastro").innerHTML = ""},5000);
    }
    botaodeposito.onclick = function(){ //Ação Botão Deposito
        if(document.getElementById("PF").checked){
            pessoa_Fisica.depositar()
            document.getElementById("detalhesdaconta").innerHTML = pessoa_Fisica.imprimir()
        }
        else if(document.getElementById("PJ").checked){
            pessoa_Juridica.depositar()
            document.getElementById("detalhesdaconta").innerHTML = pessoa_Juridica.imprimir()
        }
        else{
            document.getElementById("erroCadastro").innerHTML ="Antes de depositar, cadastre sua conta !"
            setTimeout(() => {document.getElementById("erroCadastro").innerHTML = ""},5000);
        }
        setTimeout(() => {document.getElementById("erroCadastro").innerHTML = ""},5000);
    }
    botaoextrato.onclick = function(){ //Ação Botão Extrato 
        
        if(document.getElementById("PF").checked){
            document.getElementById("sucessoCadastro").innerHTML = pessoa_Fisica.extrato()
        }
        else if(document.getElementById("PJ").checked){
            pessoa_Juridica.depositar()
            document.getElementById("sucessoCadastro").innerHTML = pessoa_Juridica.extrato()
        }
        else{
            document.getElementById("erroCadastro").innerHTML ="Antes de tirar o extrato, cadastre sua conta !"
            setTimeout(() => {document.getElementById("erroCadastro").innerHTML = ""},5000);
        }    
        setTimeout(() => {document.getElementById("sucessoCadastro").innerHTML = ""},5000);
    }
}

class Pessoa{
    constructor (recebeNome,recebeEndereco,numeroCadastro,tipoCadastro,horaCadastro,usersaldoInicial,userDepositoInput){
        this.userDeposito = userDepositoInput
        this.userSaldo = usersaldoInicial
        this.userHora= horaCadastro
        this.userTipo = tipoCadastro
        this.userCadastro = numeroCadastro 
        this.userName = recebeNome
        this.userEndereco = recebeEndereco
    }
    get userName(){return this.username}set userName(recebeNome){this.username = recebeNome}
    get userEndereco(){return this.userendereco}set userEndereco(recebeEndereco){this.userendereco = recebeEndereco}
    get userCadastro(){return this.usercadastro} set userCadastro(numeroCadastro){this.usercadastro = numeroCadastro}
    get userHora(){return this.userhora} set userHora(horaCadastro){this.userhora = horaCadastro}
    get userDeposito(){return this.userdeposito} set userDeposito(userDepositoInput){this.userdeposito = userDepositoInput}
    get userSaldo(){return this.usersaldo} set userSaldo(usersaldoInicial){this.usersaldo = usersaldoInicial}
    imprimir(){
        return this.userhora +"<br/>"+"Tipo de cadastro: "+ this.userTipo+ "<br/>" +"Numero de Cadastro: "+ this.usercadastro +"<br/>"+"Nome: " + this.username + "<br/>"+"Endereço: " + this.userendereco + "<br/>"
    }
    sacar(){
        this.saque = parseFloat(document.getElementById("saqueInput").value)
        if(this.saque >=0 && this.saque <= this.userSaldo){
            this.userSaldo = parseFloat(this.userSaldo - this.saque)
            document.getElementById("sucessoCadastro").innerHTML = "Parabens "+ this.username + " seu saque foi realizado com sucesso !"+" Saldo em conta : R$ "+ this.usersaldo
            return
        }
        else if(this.saque > this.userSaldo){
            document.getElementById("erroCadastro").innerHTML ="Valor em conta insuficiente para saque."
        }
        else{
            document.getElementById("erroCadastro").innerHTML ="Digite o valor que deseja sacar."
        }
    }
    depositar(){
        this.userdeposito = parseFloat(document.getElementById("depositoValor").value)
        if (this.userdeposito > 0){
            this.usersaldo = parseFloat(this.userdeposito + this.usersaldo)
            document.getElementById("sucessoCadastro").innerHTML = "Parabens "+ this.username + " seu deposito foi realizado com sucesso !"+" Saldo em conta : R$ "+ this.usersaldo
            return
        }
        else    
        document.getElementById("erroCadastro").innerHTML ="O valor de depósito deve ser maior que R$ 0,00"
    }
    extrato(){
        return "Saldo em conta : R$ " + this.userSaldo
    }
}

class PessoaFisica extends Pessoa{
    constructor(recebeNome,recebeEndereco,recebeCPF,recebeNascimento,numeroCadastro,tipoCadastro,horaCadastro,usersaldoInicial){
        super(recebeNome,recebeEndereco,numeroCadastro,tipoCadastro,horaCadastro,usersaldoInicial)
        this.userCPF = recebeCPF
        this.userNascimento = recebeNascimento
    }
    get userCPF(){return this.usercpf} set userCPF(recebeCPF){this.usercpf = recebeCPF}
    get userNascimento(){return this.usernascimento}set userNascimento(recebeNascimento){this.usernascimento = recebeNascimento}
    imprimir(){
        return super.imprimir() + "CPF: "+this.usercpf + "<br/>" +"Data de Nascimento: "+ this.usernascimento
    }
}

class PessoaJuridica extends Pessoa{
    constructor(recebeNome,recebeEndereco,recebeCNPJ,recebeSocial,numeroCadastro,tipoCadastro,horaCadastro,usersaldoInicial){
        super(recebeNome,recebeEndereco,numeroCadastro,tipoCadastro,horaCadastro,usersaldoInicial)
        this.userCNPJ = recebeCNPJ
        this.userSocial = recebeSocial
    }
    get userCNPJ(){return this.usercnpj} set userCNPJ(recebeCNPJ){this.usercnpj = recebeCNPJ}
    get userSocial(){return this.usersocial} set userSocial(recebeSocial){this.usersocial = recebeSocial}
    imprimir(){
        return super.imprimir() +"CNPJ: "+ this.usercnpj + "<br/>"+ "Razão Social: "+this.usersocial
    }
}