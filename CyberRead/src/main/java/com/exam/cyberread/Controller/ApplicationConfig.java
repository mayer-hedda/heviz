package com.exam.cyberread.Controller;

import java.util.Set;
import javax.ws.rs.core.Application;


@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(com.exam.cyberread.Config.CorsFilter.class);
        resources.add(com.exam.cyberread.Controller.BookController.class);
        resources.add(com.exam.cyberread.Controller.CategoryController.class);
        resources.add(com.exam.cyberread.Controller.CategoryinterestController.class);
        resources.add(com.exam.cyberread.Controller.FollowController.class);
        resources.add(com.exam.cyberread.Controller.HelpcenterController.class);
        resources.add(com.exam.cyberread.Controller.PostController.class);
        resources.add(com.exam.cyberread.Controller.PostlikeController.class);
        resources.add(com.exam.cyberread.Controller.UserController.class);
    }
    
}
