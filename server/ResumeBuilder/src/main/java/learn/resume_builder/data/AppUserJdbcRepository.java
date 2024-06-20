package learn.resume_builder.data;

import learn.resume_builder.data.mappers.RoleMapper;
import learn.resume_builder.data.mappers.SecurityUserMapper;
import learn.resume_builder.models.Role;
import learn.resume_builder.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class AppUserJdbcRepository implements AppUserRepository{

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    @Override
    public User findByUsername(String username) {
        final String sql = "select user_id, email, password_hash, username, disabled "
                + "from user "
                + "where username = ?;";

        var user = jdbcTemplate.query(sql, new SecurityUserMapper(), username).stream().findFirst().orElse(null);

        if(user!=null){
            addRoles(user);
        }

        return user;
    }


    @Override
    public User create(User user) {
        final String sql = "insert into user (email, password_hash, username)"
                + "values (?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getEmail());
            ps.setString(2, user.getPassword());
            ps.setString(3, user.getUsername());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());
        addUserAsUser(user);
        return user;
    }

    @Override
    public void update(User user) {
        final String sql = "update user set "
                + "email = ?, "
                + "username = ?, "
                + "disabled = ? "
                + "where user_id = ?;";
        jdbcTemplate.update(sql, user.getEmail(), user.getUsername(), user.isDisabled(), user.getUserId());
    }

    private void addUserAsUser(User user) {
        user.getRoles().add(new Role()); // adding the default user Role

        final String sql = "INSERT INTO user_role (user_id, role_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, user.getUserId(), 1);
    }

    private void addRoles(User user) {

        //No need to give users Admin through the API we can set it in the database directly
        //this can be changed later

        final String sql = "select r.role_id, r.`name`"
                + "from role r "
                + "inner join user_role ur on ur.role_id = r.role_id "
                + "where ur.user_id = ?;";

                /*
                + "inner join user_role ur on ur.role_id = r.skill_id "
                + "inner join user u on u.user_id = ur.user_id "
                + "where user_id = ?;";*/

        var roles = jdbcTemplate.query(sql, new RoleMapper(), user.getUserId());
        user.setRoles(roles);
    }
}