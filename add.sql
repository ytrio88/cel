create database cel;
use cel;

-- drop table cel;
create table cel (
    id int primary key not null,
    nome varchar(20) not null,
    marca int not null,
    comprimento int not null,
    largura int not null,
    altura int not null,
    disposicaocam varchar(10) not null
    totalpel int ,
    totalcase int ,
    status int not null

) engine=myisam;


-- //nome;marca;comprimento;largura;altura;pos-biometria;totalcamera;configcamera;disposicaocamera;nrobotaoesquerdo-nrobotaodireito;poscamerafrontal