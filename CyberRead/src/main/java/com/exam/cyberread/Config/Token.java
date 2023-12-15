package com.exam.cyberread.Config;

import com.exam.cyberread.Model.User;
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
import org.json.JSONObject;


public class Token {
    
    /**
     * @param user
        * id: user identification
        * image: profile picture displayed in navbar
        * username: username displayed in navbar
        * rank: check authorization
     *
     * @return token
    */
    public static String createJwt(User user) {
        Instant now = Instant.now();
        String token = Jwts.builder()
                .setIssuer("CyberRead")
                .setSubject("exam")
                .claim("id", user.getId())
                .claim("username", user.getUsername())
                .claim("image", user.getImage())
                .claim("rank", user.getRank())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(7, ChronoUnit.DAYS)))
                .signWith(
                        SignatureAlgorithm.HS256,
                        TextCodec.BASE64.decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=")
                )
                .compact();

        return token;
    }

    
    /**
     * @param token
     * 
     * @return 
        * 1: The token is valid
        * 2: The token has expired
        * 3: The token is invalid
     */
    public static int decodeJwt(String token) {
        try {
            byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
            Jws<Claims> result;
            result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
            int id = result.getBody().get("id", Integer.class);
            User user = new User(id);
            if(id == user.getId()) {
                return 1;
            } else {
                return 3;
            }
        } catch (Exception ex) {
            System.err.println("Error: " + ex.getMessage());
            return 2;
        }

    }

    
    /**
     * @param token
     * 
     * @return 
        * image: profile picture displayed in navbar
        * username: username displayed in navbar
        * rank: check authorization
     */
    public static JSONObject getDataByToken(String token) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
        
        String rank = result.getBody().get("rank", String.class);
        String username = result.getBody().get("username", String.class);
        String image = result.getBody().get("image", String.class);
        
        JSONObject data = new JSONObject();
        data.put("rank", rank);
        data.put("username", username);
        data.put("image", image);
        
        return data;
    }

    
    /**
     * @param token
     * 
     * @return userId
     */
    public static Integer getUserIdByToken(String token) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
        
        Integer id = result.getBody().get("id", Integer.class);
        return id;
    }
    
    
    /**
     * @param token
     * 
     * @return userRank
     */
    public static String getUserRankByToken(String token) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
        
        String rank = result.getBody().get("rank", String.class);
        return rank;
    }
    
}
