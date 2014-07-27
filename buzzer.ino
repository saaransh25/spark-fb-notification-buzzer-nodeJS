String poker;
long lastPokeStartMillis;

int pokeFunction(String args) {
    poker = "S";
    return poker.length();
}

void setup() {
    pinMode(D0,OUTPUT);
    pinMode(D7,OUTPUT);
    analogWrite(D0, 0);
    digitalWrite(D7,0);
    poker = "";
    lastPokeStartMillis = -2000;
    Spark.function("poke", pokeFunction);
}

void loop() {
    if(poker.equals("") == false && millis()-lastPokeStartMillis>2000){
        analogWrite(D0, constrain(map((int)poker.charAt(0), 32,128,0,255),0,255));
        String s = (poker.length()>1)?poker.substring(1):"";
        poker = s;
        lastPokeStartMillis = millis();
    }
    else if(poker.equals("")){
        analogWrite(D0, 0);
    }
}