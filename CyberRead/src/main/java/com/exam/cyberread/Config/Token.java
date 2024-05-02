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
        * username: username displayed in navbar
        * firstName: first name in the greeting
        * lastName: last name in the greeting
        * image: profile picture displayed in navbar
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
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
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
     * @param oldJwt
     * @param newUsername
     * 
     * @return new token
     */
    public static String createJwtWithNewUsername(String oldJwt, String newUsername) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(oldJwt);
        
        Integer id = result.getBody().get("id", Integer.class);
        String firstName = result.getBody().get("firstName", String.class);
        String lastName = result.getBody().get("lastName", String.class);
        String image = result.getBody().get("image", String.class);
        String rank = result.getBody().get("rank", String.class);
        
        Instant now = Instant.now();
        String token = Jwts.builder()
                .setIssuer("CyberRead")
                .setSubject("exam")
                .claim("id", id)
                .claim("username", newUsername)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .claim("image", image)
                .claim("rank", rank)
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
     * @param oldJwt
     * @param newFirstName
     * 
     * @return new token
     */
    public static String createJwtWithNewFirstName(String oldJwt, String newFirstName) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(oldJwt);
        
        Integer id = result.getBody().get("id", Integer.class);
        String username = result.getBody().get("username", String.class);
        String lastName = result.getBody().get("lastName", String.class);
        String image = result.getBody().get("image", String.class);
        String rank = result.getBody().get("rank", String.class);
        
        Instant now = Instant.now();
        String token = Jwts.builder()
                .setIssuer("CyberRead")
                .setSubject("exam")
                .claim("id", id)
                .claim("username", username)
                .claim("firstName", newFirstName)
                .claim("lastName", lastName)
                .claim("image", image)
                .claim("rank", rank)
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
     * @param oldJwt
     * @param newLastName
     * 
     * @return new token
     */
    public static String createJwtWithNewLastName(String oldJwt, String newLastName) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(oldJwt);
        
        Integer id = result.getBody().get("id", Integer.class);
        String username = result.getBody().get("username", String.class);
        String firstName = result.getBody().get("firstName", String.class);
        String image = result.getBody().get("image", String.class);
        String rank = result.getBody().get("rank", String.class);
        
        Instant now = Instant.now();
        String token = Jwts.builder()
                .setIssuer("CyberRead")
                .setSubject("exam")
                .claim("id", id)
                .claim("username", username)
                .claim("firstName", firstName)
                .claim("lastName", newLastName)
                .claim("image", image)
                .claim("rank", rank)
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
     * @param oldJwt
     * @param newImage
     * 
     * @return new jwt
     */
    public static String createJwtWithNewImage(String oldJwt, String newImage) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(oldJwt);
        
        Integer id = result.getBody().get("id", Integer.class);
        String username = result.getBody().get("username", String.class);
        String firstName = result.getBody().get("firstName", String.class);
        String lastName = result.getBody().get("lastName", String.class);
        String rank = result.getBody().get("rank", String.class);
        
        Instant now = Instant.now();
        String token = Jwts.builder()
                .setIssuer("CyberRead")
                .setSubject("exam")
                .claim("id", id)
                .claim("username", username)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .claim("image", newImage)
                .claim("rank", rank)
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
        String firstName = result.getBody().get("firstName", String.class);
        String lastName = result.getBody().get("lastName", String.class);
        String image = result.getBody().get("image", String.class);
        
        JSONObject data = new JSONObject();
        data.put("rank", rank);
        data.put("username", username);
        data.put("firstName", firstName);
        data.put("lastName", lastName);
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
     * @return username
     */
    public static String getUsernameByToken(String token) {
        byte[] secret = Base64.getDecoder().decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=");
        Jws<Claims> result;
        result = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(secret)).parseClaimsJws(token);
        
        String username = result.getBody().get("username", String.class);
        return username;
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
