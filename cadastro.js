window.onload = function(){
    let botao = document.getElementById("botao")
    botao.onclick = function(){ 
        let recebeNome = document.getElementById("nomeinput").value
        let recebeEndereco = document.getElementById("enderecoinput").value
        if(recebeNome == ""){
            alert("O campo NOME é obrigatório !") 
            return
        }
        else if(recebeEndereco == ""){
            alert("O campo ENDEREÇO é obrigatório !")
            return
        }
        else{
            //VALIDAÇÃO TIPO DE PESSOA
            if(document.getElementById("PF").checked){ //CASO PESSOA FISICA
                let recebeCPF = document.getElementById("cpfinput").value
                let recebeNascimento= document.getElementById("nascimentoinput").value
                if(recebeCPF == "" || recebeCPF.length != 11){
                    alert("O campo CPF é obrigatório e deve conter 11 digitos !")
                    return
                }
                if(recebeNascimento == "" || recebeNascimento == Date.now()){
                    alert("O campo DATA DE NASCIMENTO é obrigatório !")
                    return
                }
                if(recebeNome,recebeEndereco,recebeCPF,recebeNascimento != ""){
                    let pessoa_Fisica = new PessoaFisica(recebeNome,recebeEndereco,recebeCPF,recebeNascimento)
                    console.log(pessoa_Fisica.imprimir())
                }
            }
            else if(document.getElementById("PJ").checked){ //CASO PESSOA JURIDICA
                let recebeCNPJ = document.getElementById("cnpjinput").value
                let recebeSocial = document.getElementById("socialinput").value
                if(recebeCNPJ == "" || recebeCNPJ.length != 14){
                    alert("O campo CNPJ é obrigatório e deve conter 14 digitos !")
                    return
                }
                if(recebeSocial == ""){
                    alert("O campo RAZÃO SOCIAL é obrigatório !")
                    return
                }
                if(recebeNome,recebeEndereco,recebeCNPJ,recebeSocial != ""){
                    let pessoa_Juridica = new PessoaJuridica(recebeNome,recebeEndereco,recebeCNPJ,recebeSocial)
                    console.log(pessoa_Juridica.imprimir())
                }
            }
            else if(document.getElementById("PJ").checked == false && document.getElementById("PF").checked ==false){   //CASO NENHUM TIPO DE PESSOA SELECIONADO
                alert("Por gentileza, escolha entre Pessoa Fisica ou Pessoa Juridica")
            }
            else{
                return
            }
        } 
    }
}

class Pessoa{
    constructor (recebeNome,recebeEndereco){
        this.userName = recebeNome
        this.userEndereco = recebeEndereco
    }
    get userName(){return this.username}set userName(recebeNome){this.username = recebeNome}
    get userEndereco(){return this.userendereco}set userEndereco(recebeEndereco){this.userendereco = recebeEndereco}
    imprimir(){
        return "Nome: " + this.username + "\n"+"Endereço: " + this.userendereco + "\n"
    }
}

class PessoaFisica extends Pessoa{
    constructor(recebeNome,recebeEndereco,recebeCPF,recebeNascimento){
        super(recebeNome,recebeEndereco)
        this.userCPF = recebeCPF
        this.userNascimento = recebeNascimento
    }
    get userCPF(){return this.usercpf} set userCPF(recebeCPF){this.usercpf = recebeCPF}
    get userNascimento(){return this.usernascimento}set userNascimento(recebeNascimento){this.usernascimento = recebeNascimento}
    imprimir(){
        return super.imprimir() + "CPF: "+this.usercpf + "\n" +"Data de Nascimento: "+ this.usernascimento
    }
}

class PessoaJuridica extends Pessoa{
    constructor(recebeNome,recebeEndereco,recebeCNPJ,recebeSocial){
        super(recebeNome,recebeEndereco)
        this.userCNPJ = recebeCNPJ
        this.userSocial = recebeSocial
    }
    get userCNPJ(){return this.usercnpj} set userCNPJ(recebeCNPJ){this.usercnpj = recebeCNPJ}
    get userSocial(){return this.usersocial} set userSocial(recebeSocial){this.usersocial = recebeSocial}
    imprimir(){
        return super.imprimir() +"CNPJ: "+ this.usercnpj + "\n"+ "Razão Social: "+this.usersocial
    }
}



