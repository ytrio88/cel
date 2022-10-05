create database cel;
use cel;

-- -- -- drop table cel;
create table cel (
    id int primary key not null,
    nome varchar(20) not null,
    marca int not null,
    comprimento int,
    largura int ,
    altura int ,
    disposicaocam varchar(10) ,
    totalpel int ,
    totalcase int ,
    status int 

) engine=myisam;


-- //nome;marca;comprimento;largura;altura;pos-biometria;totalcamera;configcamera;disposicaocamera;nrobotaoesquerdo-nrobotaodireito;poscamerafrontal