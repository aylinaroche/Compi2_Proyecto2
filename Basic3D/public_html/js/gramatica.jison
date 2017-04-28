/* lexical grammar */

%lex
MultilineaComentario   = "/*" [^*] ~"*/" | "/*" "*"+ "/"~�
%%

\s+                   /* skip whitespace */
\n+                 /* skip whitespace */
\t+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'numero'
b[01]+(.[01]+)?		  return 'binario'
0x[A-Fa-f0-9]+		  return 'hexadecimal'
\"(\\.|[^"])*\" 	  return   'cadena'
\'(\\.|[^'])*\' 	  return   'cadenaSimple'
"%%"(.)*                /*IGNORAR*/;
"��"(\\.|[^"??"])*"??"		/* IGNORAR*/
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"%"                   return '%'
"("                   return '('
")"                   return ')'
">="                  return '>='
"<="                  return '<='
"=="                  return '=='
"!="                  return '!='
">"                   return '>'
"<"                   return '<'
"&&"                  return '&&'
"||"                  return '||'
"|&"                  return '|&'
"&?"                  return '&?'
"|?"                  return '|?'
"!"                   return '!'
"{"                   return '{'
"}"                   return '}'
","                   return ','
"."                   return '.'
":"                   return ':'
";"                   return ';'
"["                   return '['
"]"                   return ']'
"="           		  return '='
".."           		  return '..'
"bool"                return 'boool'
"num"                 return 'num'
"str"                 return 'str'
"NULL"                return 'nulo'
"array"               return 'arreglo'
"of"                  return 'of'
"element"             return 'element'
"create"              return 'create'
"if"                  return 'si'
"then"                return 'entonces'
"else"                return 'sino'
"switch"              return 'interruptor'
"case"                return 'caso'
"default"             return 'defecto'
"true"                return 'verdadero'
"false"               return 'falso'
"break"	              return 'romper'
"continue"            return 'continuar'
"return"              return 'retornar'
"while"               return 'mientras'
"do"                  return 'hacer'
"repeat"              return 'repetir'
"until"               return 'hasta'
"for"                 return 'para'
"loop"                return 'looop'
"count"               return 'count'
"whilex"              return 'mientrasX'
"void"                return 'vacio'
"Principal"           return 'Principal'
"getBool"             return 'getBool'
"getNum"              return 'getNum'
"outNum"              return 'outNum'
"outStr"              return 'outStr'
"inStr"               return 'inStr'
"inNum"               return 'inNum'
"show"                return 'show'
"getRandom"           return 'getRandom'
"getLength"           return 'getLength'
"bin"                 return 'bin'
"hex"                 return 'hex'
"dec"                 return 'dec'
"throws"              return 'lanzar'
"NullPointerException"		return 'NullException'
"MissingReturnException"    return 'MissingException'
"ArithmeticException"       return 'AritmeticException'
"StackOverFlowException"    return 'StackException'
"HeapOverFlowException"     return 'HeapException'
"PoolOverFlowException"     return 'PoolException'
[a-zA-z_0-9-]+		  return 'id'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '%'
%left UMINUS
%left '>' '<' '>=' '<=' '==' '!='
%left '||' '|&' 
%left '&&' '&?'
%left '|?'
%right '!'
%error-verbose


%start INICIO

%% /* language grammar */

INICIO	: ENTRADA EOF{
	parser.arbol.raiz = $1;
};

ENTRADA	: ENTRADA INSTRUCCIONES {
		nodo  = new Nodo("ENTRADA",null,null,[$1,$2]);
		$$ = nodo;
	}
		| INSTRUCCIONES{
		nodo  = new Nodo("ENTRADA",null,null,[$1]);
		$$ = nodo;
	}
		;

		
INSTRUCCIONES	:               ELEMENTO{
		nodo  = new Nodo("INSTRUCCIONES",null,null,[$1]);
		$$ = nodo;
	}
                                |VARIABLE{
		nodo  = new Nodo("INSTRUCCIONES",null,null,[$1]);
		$$ = nodo;
	}
				
				| PRINCIPAL{
		nodo  = new Nodo("INSTRUCCIONES",null,null,[$1]);
		$$ = nodo;
	}
				| CASTEO{
		nodo  = new Nodo("INSTRUCCIONES",null,null,[$1]);
		$$ = nodo;
	}
				| METODO{
		nodo  = new Nodo("INSTRUCCIONES",null,null,[$1]);
		$$ = nodo;
	}
				| FUNCIONES{
		nodo  = new Nodo("INSTRUCCIONES",null,null,[$1]);
		$$ = nodo;
	}
				;
				
				
PRINCIPAL	: Principal '(' ')' '{'  INSTRUCCION '}'{ //2
		nodo  = new Nodo("PRINCIPAL",null,null,[$1,$5]);
		$$ = nodo;
	}
			;

			
TIPO	: boool { //1
		nodo1 = new Nodo('boool',$1,@1,[]);
		nodo  = new Nodo("TIPO",null,null,[nodo1]);
		$$ = nodo;
	}
		| num{ //1
		nodo1 = new Nodo('num',$1,@1,[]);
		nodo  = new Nodo("TIPO",null,null,[nodo1]);
		$$ = nodo;
	}
		| str{ //1
		nodo1 = new Nodo('str',$1,@1,[]);
		nodo  = new Nodo("TIPO",null,null,[nodo1]);
		$$ = nodo;
	}
		| id{ //1
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("TIPO",null,null,[nodo1]);
		$$ = nodo;
	}
		| vacio{ //1
		nodo1 = new Nodo('vacio',$1,@1,[]);
		nodo  = new Nodo("TIPO",null,null,[nodo1]);
		$$ = nodo;
	}
		| TIPO '*'{ //2
		nodo1 = new Nodo('*',$2,@2,[]);
		nodo  = new Nodo("TIPO",null,null,[$1,nodo1]);
		$$ = nodo;
	}
		;

		
VARIABLE: arreglo ':' id DIMEN of TIPO ';' { //6
		nodo1 = new Nodo('arreglo',$1,@1,[]);
		nodo2 = new Nodo(':',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('of',$5,@5,[]);
		nodo  = new Nodo("VARIABLE",null,null,[nodo1,nodo2,nodo3,$4,nodo4,$6]);
		$$ = nodo;
	}
		| TIPO MasVARIABLE ASIGNAR ';'{ //3
		nodo  = new Nodo("VARIABLE",null,null,[$1,$2,$3]);
		$$ = nodo;
	}
		;
			
			
ASIGNAR	: ':' OP{ //2
		nodo1 = new Nodo(':',$1,@1,[]);
		nodo  = new Nodo("ASIGNAR",null,null,[nodo1,$2]);
		$$ = nodo;
	}
		|{ //1
		nodo1 = new Nodo('nulo',null,null,[]);
		nodo  = new Nodo("ASIGNAR",null,null,[nodo1]);
		$$ = nodo;
	}
		;
	
	
MasVARIABLE	: MasVARIABLE ',' id{ //3
		nodo1 = new Nodo(',',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("MasVARIABLE",null,null,[$1,nodo1,nodo2]);
		$$ = nodo;
	}
			| id{ //1
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("MasVARIABLE",null,null,[nodo1]);
		$$ = nodo;
	}
			;
	
	
DIMEN	: DIMEN '[' DIM ']'{ //4
		nodo1 = new Nodo('[',$2,@2,[]);
		nodo2 = new Nodo(']',$4,@4,[]);
		nodo  = new Nodo("DIMEN",null,null,[$1,nodo1,$3,nodo2]);
		$$ = nodo;
	}
		| '[' DIM ']' { //3
		nodo1 = new Nodo('[',$1,@1,[]);
		nodo2 = new Nodo(']',$3,@3,[]);
		nodo  = new Nodo("DIMEN",null,null,[nodo1,$2,nodo2]);
		$$ = nodo;
	}
		;
		
		
DIM 	: numero '.' '.' numero { //3
		nodo1 = new Nodo('numero',$1,@1,[]);
		nodo2 = new Nodo('.',$3,@3,[]);
		nodo3 = new Nodo('numero',$4,@4,[]);
		nodo  = new Nodo("DIM",null,null,[nodo1,nodo2,nodo3]);
		$$ = nodo;
	}
		| numero { //1
		nodo1 = new Nodo('numero',$1,@1,[]);
		nodo  = new Nodo("DIM",null,null,[nodo1]);
		$$ = nodo;
	}
	;

	
ASIGNACION	: id ACCESO '=' OP ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('=',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",null,null,[nodo1,$2,nodo2,$4]);
		$$ = nodo;
	}
			| id DIMEN '=' OP ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('=',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",null,null,[nodo1,$2,nodo2,$4]);
		$$ = nodo;
	}
			| id '=' OP ';'{ //3
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('=',$2,@2,[]);
		nodo  = new Nodo("ASIGNACION",null,null,[nodo1,nodo2,$3]);
		$$ = nodo;
	}
			;

			
ACCESO	: ACCESO'.'id{
		nodo1 = new Nodo('.',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("ACCESO",null,null,[$1,nodo1,nodo2]);
		$$ = nodo;
	}
		|'.'id{
		nodo1 = new Nodo('.',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("ACCESO",null,null,[nodo1,nodo2]);
		$$ = nodo;
	}
		;
		
		
ELEMENTO: element ':' id '{' INSTRUCCION '}' {
		nodo0 = new Nodo('element',$1,@1,[]);
		nodo1 = new Nodo(':',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo3 = new Nodo('{',$4,@4,[]);
		nodo4 = new Nodo('}',$6,@6,[]);
		nodo  = new Nodo("ELEMENTO",null,null,[nodo0,nodo1,nodo2,nodo3,$5,nodo4]);
		$$ = nodo;
	}
		;

		
METODO  : TIPO ':' id '(' PARAMETRO ')' '{' INSTRUCCION '}'{ //9
		nodo1 = new Nodo(':',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo3 = new Nodo('(',$4,@4,[]);
		nodo4 = new Nodo(')',$6,@6,[]);
		nodo5 = new Nodo('{',$7,@7,[]);
		nodo6 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",null,null,[$1,nodo1,nodo2,nodo3,$5,nodo4,nodo5,$8,nodo6]);
		$$ = nodo;
	}
		| TIPO DIMEN ':' id '(' PARAMETRO ')' '{' INSTRUCCION '}'{
		nodo1 = new Nodo(':',$3,@3,[]);
		nodo2 = new Nodo('id',$4,@4,[]);
		nodo3 = new Nodo('(',$5,@5,[]);
		nodo4 = new Nodo(')',$7,@7,[]);
		nodo5 = new Nodo('{',$8,@8,[]);
		nodo6 = new Nodo('}',$10,@10,[]);
		nodo  = new Nodo("METODO",null,null,[$1,$2,nodo1,nodo2,nodo3,$6,nodo4,nodo5,$9,nodo6]);
		$$ = nodo;
	}
		;

		
PARAMETRO 	: PARAMETRO ',' TIPO id{
		nodo1 = new Nodo(',',$2,@2,[]);
		nodo2 = new Nodo('id',$4,@4,[]);
		nodo  = new Nodo("PARAMETRO",null,null,[$1,nodo1,$3,nodo2]);
		$$ = nodo;
	}
			| PARAMETRO ',' TIPO id DIMEN{
		nodo1 = new Nodo(',',$2,@2,[]);
		nodo2 = new Nodo('id',$4,@4,[]);
		nodo  = new Nodo("PARAMETRO",null,null,[$1,nodo1,$3,nodo2,$5]);
		$$ = nodo;
	}
			| TIPO id{
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAMETRO",null,null,[$1,nodo2]);
		$$ = nodo;
	}
			| TIPO id DIMEN{
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAMETRO",null,null,[$1,nodo2,$3]);
		$$ = nodo;
	}
			|{
		nodo2 = new Nodo('nulo',null,null,[]);
		nodo  = new Nodo("PARAMETRO",null,null,[nodo2]);
		$$ = nodo;
	}
			;
		
		
INSTRUCCION : INSTRUCCION INST{
		nodo  = new Nodo("INSTRUCCION",null,null,[$1,$2]);
		$$ = nodo;
	}
			| INST{
		nodo  = new Nodo("INSTRUCCION",null,null,[$1]);
		$$ = nodo;
	}
			;
			
			
INST 	: VARIABLE{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| ASIGNACION{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| ELEMENTO{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| SI{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| SWITCH{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| CICLO{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| FOR{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| FUNCIONES{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| OTROS{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| INSTANCIA ';'{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| THROW{
		nodo  = new Nodo("INST",null,null,[$1]);
		$$ = nodo;
	}
		| romper ';'{
		nodo1 = new Nodo('romper',$1,@1,[]);
		nodo  = new Nodo("INST",null,null,[nodo1]);
		$$ = nodo;
	}
		| romper OP ';'{
		nodo1 = new Nodo('romper',$1,@1,[]);
		nodo  = new Nodo("INST",null,null,[nodo1,$2]);
		$$ = nodo;
	}
		| continuar ';'{
		nodo1 = new Nodo('continuar',$1,@1,[]);
		nodo  = new Nodo("INST",null,null,[nodo1]);
		$$ = nodo;
	}
		| retornar ';'{
		nodo1 = new Nodo('retornar',$1,@1,[]);
		nodo  = new Nodo("INST",null,null,[nodo1]);
		$$ = nodo;
	}
		| retornar OP ';'{
		nodo1 = new Nodo('retornar',$1,@1,[]);
		nodo  = new Nodo("INST",null,null,[nodo1,$2]);
		$$ = nodo;
	}
		;
		
		
SI	: si '(' OP ')' entonces '{' INSTRUCCION '}'{
		nodo1 = new Nodo('si',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$4,@4,[]);
		nodo4 = new Nodo('entonces',$5,@5,[]);
		nodo5 = new Nodo('{',$6,@6,[]);
		nodo6 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("SI",null,null,[nodo1,nodo2,$3,nodo3,nodo4,nodo5,$7,nodo6]);
		$$ = nodo;
	}
	| si '(' OP ')' entonces '{' INSTRUCCION '}' sino '{' INSTRUCCION '}'{
		nodo1 = new Nodo('si',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$4,@4,[]);
		nodo4 = new Nodo('entonces',$5,@5,[]);
		nodo5 = new Nodo('{',$6,@6,[]);
		nodo6 = new Nodo('}',$8,@8,[]);
		nodo7 = new Nodo('sino',$9,@9,[]);
		nodo8 = new Nodo('{',$10,@10,[]);
		nodo9 = new Nodo('}',$12,@12,[]);
		nodo  = new Nodo("SI",null,null,[nodo1,nodo2,$3,nodo3,nodo4,nodo5,$7,nodo6,nodo7,nodo8,$11,nodo9]);
		$$ = nodo;
	}
	;

	
SWITCH	: interruptor '(' OP ',' MODO ')' '{' CASO '}'{
		nodo1 = new Nodo('interruptor',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo4 = new Nodo(')',$6,@6,[]);
		nodo5 = new Nodo('{',$7,@7,[]);
		nodo7 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("SWITCH",null,null,[nodo1,nodo2,$3,nodo3,$5,nodo4,nodo5,$8,nodo7]);
		$$ = nodo;
	}
		| interruptor '(' OP ',' MODO ')' '{' CASO DEFECTO '}'{
		nodo1 = new Nodo('interruptor',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo4 = new Nodo(')',$6,@6,[]);
		nodo5 = new Nodo('{',$7,@7,[]);
		nodo7 = new Nodo('}',$10,@10,[]);
		nodo  = new Nodo("SWITCH",null,null,[nodo1,nodo2,$3,nodo3,$5,nodo4,nodo5,$8,$9,nodo7]);
		$$ = nodo;
	}
		;

		
MODO	: verdadero{
		nodo1 = new Nodo('verdadero',$1,@1,[]);
		nodo  = new Nodo("MODO",null,null,[nodo1]);
		$$ = nodo;
	}
		| falso{
		nodo1 = new Nodo('falso',$1,@1,[]);
		nodo  = new Nodo("MODO",null,null,[nodo1]);
		$$ = nodo;
	}
		;

		
CASO 	: CASO caso PUNTUAL ':' INSTRUCCION{
		nodo1 = new Nodo('caso',$2,@2,[]);
		nodo4 = new Nodo(':',$4,@4,[]);
		nodo  = new Nodo("CASO",null,null,[$1,nodo1,$3,nodo4,$5]);
		$$ = nodo;
	}
		| caso PUNTUAL ':' INSTRUCCION{
		nodo1 = new Nodo('caso',$1,@1,[]);
		nodo4 = new Nodo(':',$3,@3,[]);
		nodo  = new Nodo("CASO",null,null,[nodo1,$2,nodo4,$4]);
		$$ = nodo;
	}
		| CASO caso PUNTUAL '-' PUNTUAL ':' INSTRUCCION{
		nodo1 = new Nodo('caso',$2,@2,[]);
		nodo2 = new Nodo('-',$4,@4,[]);
		nodo4 = new Nodo(':',$6,@6,[]);
		nodo  = new Nodo("CASO",null,null,[$1,nodo1,$3,nodo2,$5,nodo4,$7]);
		$$ = nodo;
	}
		| caso PUNTUAL '-' PUNTUAL ':' INSTRUCCION{
		nodo1 = new Nodo('caso',$1,@1,[]);
		nodo2 = new Nodo('-',$3,@3,[]);
		nodo4 = new Nodo(':',$5,@5,[]);
		nodo  = new Nodo("CASO",null,null,[nodo1,$2,nodo2,$4,nodo4,$6]);
		$$ = nodo;
	}
		;
		

PUNTUAL : cadena{
		nodo1 = new Nodo('cadena',$1,@1,[]);
		nodo  = new Nodo("PUNTUAL",null,null,[nodo1]);
		$$ = nodo;
	}
		| numero{
		nodo1 = new Nodo('numero',$1,@1,[]);
		nodo  = new Nodo("PUNTUAL",null,null,[nodo1]);
		$$ = nodo;
	}
		;
		
		
DEFECTO	: defecto ':' INSTRUCCION{
		nodo1 = new Nodo('defecto',$1,@1,[]);
		nodo2 = new Nodo(':',$2,@2,[]);
		nodo  = new Nodo("DEFECTO",null,null,[nodo1,nodo2,$3]);
		$$ = nodo;
	}
		;

		
CICLO 	: mientras '(' OP ')' '{' INSTRUCCION '}'{
		nodo1 = new Nodo('mientras',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo6 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CICLO",null,null,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo6]);
		$$ = nodo;
	}
		| hacer '{' INSTRUCCION '}' mientras '(' OP ')'{
		nodo1 = new Nodo('hacer',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo3 = new Nodo('}',$4,@4,[]);
		nodo4 = new Nodo('mientras',$5,@5,[]);
		nodo5 = new Nodo('(',$6,@6,[]);
		nodo7 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CICLO",null,null,[nodo1,nodo2,$3,nodo3,nodo4,nodo5,$7,nodo7]);
		$$ = nodo;
	}
		| repetir '{' INSTRUCCION '}' hasta '(' OP ')'{
		nodo1 = new Nodo('repetir',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo3 = new Nodo('}',$4,@4,[]);
		nodo4 = new Nodo('hasta',$5,@5,[]);
		nodo5 = new Nodo('(',$6,@6,[]);
		nodo7 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CICLO",null,null,[nodo1,nodo2,$3,nodo3,nodo4,nodo5,$7,nodo7]);
		$$ = nodo;
	}
		| looop id '{' INSTRUCCION '}'{
		nodo1 = new Nodo('loop',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('{',$3,@3,[]);
		nodo4 = new Nodo('}',$5,@5,[]);
		nodo  = new Nodo("CICLO",null,null,[nodo1,nodo2,nodo3,$4,nodo4]);
		$$ = nodo;
	}
		| hacer '{' INSTRUCCION '}' mientrasX '(' OP "," OP ')'{
		nodo1 = new Nodo('hacer',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo3 = new Nodo('}',$4,@4,[]);
		nodo4 = new Nodo('mientrasX',$5,@5,[]);
		nodo5 = new Nodo('(',$6,@6,[]);
		nodo6 = new Nodo(',',$8,@8,[]);
		nodo7 = new Nodo(')',$10,@10,[]);
		nodo  = new Nodo("CICLO",null,null,[nodo1,nodo2,$3,nodo3,nodo4,nodo5,$7,nodo6,$9,nodo7]);
		$$ = nodo;
	}
		;

		
FOR 	: para '(' ASIGNACION  OP ';' OP ')' '{' INSTRUCCION '}'{
		nodo1 = new Nodo('para',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(';',$5,@5,[]);
		nodo4 = new Nodo(')',$7,@7,[]);
		nodo5 = new Nodo('{',$8,@8,[]);
		nodo6 = new Nodo('}',$10,@10,[]);
		nodo  = new Nodo("FOR",null,null,[nodo1,nodo2,$3,$4,nodo3,$6,nodo4,nodo5,$9,nodo6]);
		$$ = nodo;
	}
		| para '(' VARIABLE OP ';' OP ')' '{' INSTRUCCION '}'{
		nodo1 = new Nodo('para',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(';',$5,@5,[]);
		nodo4 = new Nodo(')',$7,@7,[]);
		nodo5 = new Nodo('{',$8,@8,[]);
		nodo6 = new Nodo('}',$10,@10,[]);
		nodo  = new Nodo("FOR",null,null,[nodo1,nodo2,$3,$4,nodo3,$6,nodo4,nodo5,$9,nodo6]);
		$$ = nodo;
	}
		| count '(' OP ')' '{' INSTRUCCION '}'{
		nodo1 = new Nodo('count',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo6 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("FOR",null,null,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo6]);
		$$ = nodo;
	}
		;
		
		
INSTANCIA	: id '(' VALOR ')' {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("INSTANCIA",null,null,[nodo1,nodo2,$3,nodo3]);
		$$ = nodo;
	}
			;
			
			
VALOR 	: VALOR ',' OP{
		nodo1 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("VALOR",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
		| OP{
		nodo  = new Nodo("VALOR",null,null,[$1]);
		$$ = nodo;
	}
		|{
		nodo1 = new Nodo('nulo',null,null,[]);
		nodo  = new Nodo("VALOR",null,null,[nodo1]);
		$$ = nodo;
	}
		;
		
		
CASTEO	: TIPO ':' getBool '(' str id ')'
		| TIPO ':' getNum '(' str id ',' str BASE ',' num numero')'
		| TIPO ':' outStr '(' str id ')'
		| TIPO ':' outNum '(' num id ',' boool id ')'
		| TIPO ':' inStr '(' id ',' str id ')'
		| TIPO ':' inNum '(' str id ',' num numero ')'
		| TIPO ':' show '(' str id ')'
		;
		
BASE 	: bin{
		nodo1 = new Nodo('bin',$1,@1,[]);
		nodo  = new Nodo("BASE",null,null,[nodo1]);
		$$ = nodo;
	}
		| hex{
		nodo1 = new Nodo('hex',$1,@1,[]);
		nodo  = new Nodo("BASE",null,null,[nodo1]);
		$$ = nodo;
	}
		| dec{
		nodo1 = new Nodo('dec',$1,@1,[]);
		nodo  = new Nodo("BASE",null,null,[nodo1]);
		$$ = nodo;
	}
		;
		
FUNCIONES	: TIPO ':' getRandom '(' ')'{
		nodo1 = new Nodo(':',$2,@2,[]);
		nodo2 = new Nodo('getRandom',$3,@3,[]);
		nodo3 = new Nodo('(',$4,@4,[]);
		nodo4 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("OTROS",null,null,[$1,nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	}
			| TIPO ':' getLength '(' id ',' num numero ')'{
		nodo1 = new Nodo(':',$2,@2,[]);
		nodo2 = new Nodo('getLength',$3,@3,[]);
		nodo3 = new Nodo('(',$4,@4,[]);
		nodo4 = new Nodo('id',$5,@5,[]);
		nodo5 = new Nodo(',',$6,@6,[]);
		nodo6 = new Nodo('num',$7,@7,[]);
		nodo7 = new Nodo('numero',$8,@8,[]);
		nodo8 = new Nodo(')',$9,@9,[]);
		nodo  = new Nodo("OTROS",null,null,[$1,nodo1,nodo2,nodo3,nodo4,nodo5,nodo6,nodo7,nodo8]);
		$$ = nodo;
	}
			| TIPO ':' getLength '(' str id ')'{
		nodo1 = new Nodo(':',$2,@2,[]);
		nodo2 = new Nodo('getLength',$3,@3,[]);
		nodo3 = new Nodo('(',$4,@4,[]);
		nodo4 = new Nodo('str',$5,@5,[]);
		nodo5 = new Nodo('id',$6,@6,[]);
		nodo6 = new Nodo(')',$7,@7,[]);
		nodo  = new Nodo("OTROS",null,null,[$1,nodo1,nodo2,nodo3,nodo4,nodo5,nodo6]);
		$$ = nodo;
	}
	;

OTROS  	: OTROS ';'{
		nodo  = new Nodo("OTROS",null,null,[$1]);
		$$ = nodo;
	}
		| getBool '(' OP ')'{
		nodo1 = new Nodo('getBool',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo5 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo5]);
		$$ = nodo;
	}
		| getNum '(' OP ',' BASE ',' OP ')'{
		nodo1 = new Nodo('getNum',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo4 = new Nodo(',',$6,@6,[]);
		nodo5 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo3,$5,nodo4,$7,nodo5]);
		$$ = nodo;
	}
		| outStr '(' OP ')' {
		nodo1 = new Nodo('outStr',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo5 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo5]);
		$$ = nodo;
	}
		| outNum '(' OP ','  OP ')'{
		nodo1 = new Nodo('outNum',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo4 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo3,$5,nodo4]);
		$$ = nodo;
	}
		| inStr '(' OP ',' OP ')' {
		nodo1 = new Nodo('inStr',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo4 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo3,$5,nodo4]);
		$$ = nodo;
	}
		| inNum '(' OP ',' OP ')'{
		nodo1 = new Nodo('inNum',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo4 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo3,$5,nodo4]);
		$$ = nodo;
	}
		| show '(' OP ')'{
		nodo1 = new Nodo('getNum',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo5 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo5]);
		$$ = nodo;
	}
		| getRandom '(' ')'{
		nodo1 = new Nodo('getRandom',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo5 = new Nodo(')',$3,@3,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,nodo5]);
		$$ = nodo;
	}		
		| getLength '(' OP ','  OP ')' {
		nodo1 = new Nodo('getLength',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo4 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo3,$5,nodo4]);
		$$ = nodo;
	}
		| getLength '(' OP ')' {
		nodo1 = new Nodo('getLength',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("OTROS",null,null,[nodo1,nodo2,$3,nodo3]);
		$$ = nodo;
	}
		;
			
THROW	: lanzar '(' EXCEPCION ')' ';'{
		nodo1 = new Nodo('lanzar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("THROW",null,null,[nodo1,nodo2,$3,nodo3]);
		$$ = nodo;
	}
		;

EXCEPCION	: NullException{
		nodo1 = new Nodo('Null',$1,@1,[]);
		nodo  = new Nodo("EXCEPCION",null,null,[nodo1]);
		$$ = nodo;
	}
			| MissingException{
		nodo1 = new Nodo('Missing',$1,@1,[]);
		nodo  = new Nodo("EXCEPCION",null,null,[nodo1]);
		$$ = nodo;
	}
			| AritmeticException{
		nodo1 = new Nodo('Aritmetic',$1,@1,[]);
		nodo  = new Nodo("EXCEPCION",null,null,[nodo1]);
		$$ = nodo;
	}
			| StackException{
		nodo1 = new Nodo('Stack',$1,@1,[]);
		nodo  = new Nodo("EXCEPCION",null,null,[nodo1]);
		$$ = nodo;
	}
			| HeapException{
		nodo1 = new Nodo('Heap',$1,@1,[]);
		nodo  = new Nodo("EXCEPCION",null,null,[nodo1]);
		$$ = nodo;
	}
			| PoolException{
		nodo1 = new Nodo('Pool',$1,@1,[]);
		nodo  = new Nodo("EXCEPCION",null,null,[nodo1]);
		$$ = nodo;
	}
			;
		
OP: E { 
		nodo  = new Nodo("OP",null,null,[$1]);
		$$ = nodo;
		//console.log("Expresion"); 
	}
	;

E   : '(' E ')'{
		nodo1 = new Nodo('(',$1,@1,[]);
		nodo2 = new Nodo(')',$3,@3,[]);
		nodo  = new Nodo("E",null,null,[nodo1,$1,nodo2]);
		$$ = nodo;
	}
	| E '+' E{
		nodo1 = new Nodo('+',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '-' E{
		nodo1 = new Nodo('-',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '*' E{
		nodo1 = new Nodo('*',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '/' E{
		nodo1 = new Nodo('/',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '^' E{
		nodo1 = new Nodo('^',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '!'{
		nodo1 = new Nodo('!',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1]);
		$$ = nodo;
	}
    | E '%'{
		nodo1 = new Nodo('%',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1]);
		$$ = nodo;
	}
    | '-' E %prec UMINUS{
		nodo1 = new Nodo('-',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[nodo1,$1]);
		$$ = nodo;
	}
	| E '>=' E{
		nodo1 = new Nodo('>=',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '<=' E{
		nodo1 = new Nodo('<=',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '==' E{
		nodo1 = new Nodo('==',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| E '!=' E{
		nodo1 = new Nodo('!=',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| E '>' E{
		nodo1 = new Nodo('>',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '<' E{
		nodo1 = new Nodo('<',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '||' E{
		nodo1 = new Nodo('||',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '|&' E{
		nodo1 = new Nodo('|&',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '&&' E{
		nodo1 = new Nodo('&&',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '&?' E{
		nodo1 = new Nodo('&?',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| E '|?' E{
		nodo1 = new Nodo('|?',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| verdadero{
		nodo1 = new Nodo("verdadero",$1,@1,[]);
		nodo	= new Nodo("E",null,null,[nodo1]);
		$$ = nodo;
	}	
	| falso{
		nodo1 = new Nodo("falso",$1,@1,[]);
		nodo	= new Nodo("E",null,null,[nodo1]);
		$$ = nodo;
	}	
	| E '+''+'{
		nodo1 = new Nodo('+',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,nodo1]);
		$$ = nodo;
	}
	| E '-''-'{
		nodo1 = new Nodo('-',$2,@2,[]);
		nodo  = new Nodo("E",null,null,[$1,nodo1,nodo1]);
		$$ = nodo;
	}
	| id ACCESO{
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo  = new Nodo("E",null,null,[nodo1,$2]);
		$$ = nodo;
	}
    | numero{
		nodo1 = new Nodo("numero",$1,@1,[]);
		nodo	= new Nodo("E",null,null,[nodo1]);
		$$ = nodo;
	}	
	| id {
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo	= new Nodo("E",null,null,[nodo1]);
		$$ = nodo;
	}	
	| cadena{
		nodo1 = new Nodo("cadena",$1,@1,[]);
		nodo	= new Nodo("E",null,null,[nodo1]);
		$$ = nodo;
	}	
	| cadenaSimple{
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo	= new Nodo("cadenaSimple",null,null,[nodo1]);
		$$ = nodo;
	}	
	| nulo{
		nodo1 = new Nodo("nulo",$1,@1,[]);
		nodo	= new Nodo("E",null,null,[nodo1]);
		$$ = nodo;
	}	
	| create '(' id ')'{
		nodo1 = new Nodo('create',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(")",$4,@4,[]);
		nodo  = new Nodo("E",null,null,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	}	
	| INSTANCIA {
		nodo	= new Nodo("E",null,null,[$1]);
		$$ = nodo;
	}	
    ;

%%

function Nodo(nombre, token,posicion, hijos){
	this.nombre = nombre;
	this.token = token;
	this.posicion = posicion;
	this.hijos = hijos;	
}

parser.arbol ={
	raiz:null
};
