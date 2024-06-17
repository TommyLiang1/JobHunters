package learn.data;

import learn.models.Summary;

public interface SummaryRepository {
    Summary findById(int summaryId);

    Summary add(Summary summary);

    boolean update(Summary summary);

    boolean deleteById(int summaryId);
}
