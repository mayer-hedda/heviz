package com.mycompany.cyberread.Config;

import com.mycompany.cyberread.Modell.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import io.jsonwebtoken.security.Keys;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

public class Token {

    public static String createJwt(User u) {

        Instant now = Instant.now();
        String token = Jwts.builder()
                .setIssuer("CyberRead")
                .setSubject("vizsga")
                .claim("id", u.getId())
                .claim("image", u.getImage())
                .claim("username", u.getUsername())
                .claim("rank", u.getRank())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(7, ChronoUnit.DAYS)))
                .signWith(
                        SignatureAlgorithm.HS256,
                        TextCodec.BASE64.decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=")
                )
                .compact();

        return token;
    }

    public static int decodeJwt(String token) {
        try {
            byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
            Jws<Claims> result;
            result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
            int id = result.getBody().get("id", Integer.class);
            User u = new User(id);
            if (id == u.getId()) {
                return 1;
            } else {
                //a token érvénytelen
                return 3;
            }
        } catch (Exception ex) {
            System.err.println("Hiba: " + ex.getMessage());
            //A token lejárt
            return 2;
        }

    }

    public static User getUserByToken(String token) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
        int id = result.getBody().get("id", Integer.class);
        User u = new User(id);
        return u;
    }

    public static Integer getUserIdByToken(String token) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
        Integer id = result.getBody().get("id", Integer.class);
        return id;
    }
    
    public static String getUserRankByToken(String token) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
        String rank = result.getBody().get("rank", String.class);
        return rank;
    }

}